import { PartialType } from "@nestjs/mapped-types";
import { AddExpenseReqeustDto } from "./expense.request.dto";

export class UpdateExpenseDto extends PartialType(AddExpenseReqeustDto) { }