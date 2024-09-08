import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    // @Inject('API_KEY') private apiKey: string,
    // @Inject('TASKS') private tasks: any[]
  ) { }
  getHello(): string {
    // console.log(this.tasks)
    return `Heello World! `;
  }
  // getTasks() {
  //   return new Promise((resolve, reject) => {
  //     this.clientPg.query('SELECT * FROM tasks', (err, res) => {
  //       console.log(err);
  //       resolve(res.rows);
  //     });
  //   });
  // }
}
