/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private  userRepository: Repository<User>,
        private jwtService: JwtService,
    ){}

    async signup(authCredentialsdto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsdto;
    
        const create = await this.userRepository.findOneBy({username: username})
        if(create) {
            throw new NotFoundException('This Username is already exist')
        }
        
        const user = this.userRepository.create({
          username,
          password,
        });
    
        await this.userRepository.save(user);
        return;
      }

      async signin(authCredentialsdto:AuthCredentialsDto): Promise<{accessToken: string}>{
          const {username, password} = authCredentialsdto;
            
         const user = await this.userRepository.findOneBy({username: username})
      
         if( user && user.password ===  password ){
          const payload: JwtPayload = {username};

          const accessToken: string = await this.jwtService.sign(payload);
          return{ accessToken };
         }
         else{
          throw new UnauthorizedException('Please check your login credentials');
         }
      
      }
}

