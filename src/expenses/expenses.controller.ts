import { Body, Controller, Post } from '@nestjs/common';
import { CommonResposneDto } from 'src/common/dto/response.dto';
import { success } from 'src/utils/response.util';
import { AddExpenseReqeustDto } from './dto/expense.request.dto';

@Controller('expenses')
export class ExpensesController {
    @Post()
    async addExpense(@Body() expenseRequestDto: AddExpenseReqeustDto): Promise<CommonResposneDto<AddExpenseReqeustDto>> {
        return success(new AddExpenseReqeustDto());
    }
}