import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private clientPg: Client,
    @Inject('API_KEY') private apiKey: string,
    // @Inject('TASKS') private tasks: any[]
  ) { }
  getHello(): string {
    // console.log(this.tasks)
    const mensajito = " ${JSON.stringify(this.tasks[1].title)}"
    return `Heello World! ${this.apiKey} `;
  }
  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        console.log(err);
        resolve(res.rows);
      });
    });
  }
}
