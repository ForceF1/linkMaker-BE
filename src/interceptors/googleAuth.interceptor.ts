import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpService,
  UnauthorizedException, HttpException, HttpStatus,
} from '@nestjs/common';

@Injectable()
export class GoogleAuthInterceptor implements NestInterceptor {
  constructor(
    private readonly httpService: HttpService
  ){}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization && request.headers.authorization.split(' ')[1];
    if(!token)
      throw new UnauthorizedException();
    const { data } = await this.httpService.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`).toPromise()
      .catch(() => {
        throw new HttpException('You have successfully downgraded', HttpStatus.OK);
      });
    if(request && data){
      request.user = data;
      return next
        .handle()
        .pipe();
    }
    throw new UnauthorizedException();
  }
}