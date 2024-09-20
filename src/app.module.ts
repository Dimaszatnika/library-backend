import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // ganti dengan user database MySQL Anda
      password: '',     // ganti dengan password MySQL Anda
      database: 'library',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Jangan gunakan di production
    }),
    MemberModule,
    BookModule,
  ],
})
export class AppModule {}
