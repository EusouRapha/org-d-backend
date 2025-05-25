import { IsNotEmpty } from "class-validator";

export class CreateAccountDto {
     @IsNotEmpty()
    client_id: number;
}
