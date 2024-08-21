export class UserData {
  email: string;
  password: string;
  telegram_id: string = '';
  stage: number = 1;
  gameStage: number = 0;

  constructor(email: string, password: string, telegram_id: string) {
    this.email = email;
    this.password = password;
    this.telegram_id = telegram_id;
  }
}
