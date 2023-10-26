import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/create')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get('/find_all')
  findAll() {
    return this.transactionsService.findAll();
  }
  @Get('/recent/:userId')
  async getRecentTransactions(@Param('userId') userId: string) {
    return this.transactionsService.getRecentTransactionsForUser(userId);
  }

  @Get('/find_all/:id')
  findAllForUser(@Param('id') id: string) {
    return this.transactionsService.findAllForUser(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  //deleting many transactions based on condition
  @Delete('/remove-transactions/:userId')
  async removeTransactions(@Param('userId') userId: string): Promise<string> {
    try {
      // Define your condition to filter transactions to be removed
      const condition = {
        // Example condition: remove transactions with amount less than 0
        userId: userId,
        amount: { $lt: 100 },
      };

      const result =
        await this.transactionsService.removeTransactions(condition);
      if (result.deletedCount > 0) {
        return `Removed ${result.deletedCount} transactions for user with ID ${userId}`;
      } else {
        return `No transactions matching the condition found for user with ID ${userId}`;
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException(
          'An error occurred while removing transactions.',
        );
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
