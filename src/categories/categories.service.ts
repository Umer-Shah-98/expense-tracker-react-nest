import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}
  async create(category: any) {
    try {
      const userId = category.userId;
      const categoryName = category.categoryName;
      const filter = { userId, categoryName };
      const existingCategory = await this.categoryModel.findOne(filter).exec();
      if (!existingCategory) {
        const categoryCreated = await this.categoryModel.create(category);
        return categoryCreated;
      } else {
        throw new BadRequestException('Category already exists.');
      }
      // const userExistingCategories = existingCategories.filter(
      //   (cat) => cat.userId.toString() === category.userId,
      // );

      // userExistingCategories.map((userCat) => {
      //   if (userCat.categoryName === category.categoryName) {
      //     throw new BadRequestException('Category already exists.');
      //   }
      // });
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Handle validation or business logic errors
        return { error: error.message };
      } else if (error instanceof Error) {
        // Handle other unexpected errors
        return {
          error: 'An error occurred on the server. Please try again later.',
        };
      }
    }
  }
  //creating categories on signUp functionality
  async createCategoriesOnSignup(userId: any) {
    try {
      const categoryObject = {
        categoryName: '',
        userId: userId,
        totalAmount: 0,
        incomeAmount: 0,
        expenseAmount: 0,
      };
      const categoryNames = [
        'Education',
        'Health',
        'Food',
        'Entertainment',
        'Clothes',
        'Festivals',
      ];
      const categories = await Promise.all(
        categoryNames.map(async (category) => {
          return this.categoryModel.create({
            ...categoryObject,
            categoryName: category,
          });
        }),
      );

      // console.log(categories);

      return categories;
      // const educationCategory = {
      //   categoryName: 'Education',
      //   userId: userId,
      //   totalAmount: 0,
      //   incomeAmount: 0,
      //   expenseAmount: 0,
      // };
      // const healthCategory = {
      //   categoryName: 'Health',
      //   userId: userId,
      //   totalAmount: 0,
      //   incomeAmount: 0,
      //   expenseAmount: 0,
      // };
      // const foodCategory = {
      //   categoryName: 'Food',
      //   userId: userId,
      //   totalAmount: 0,
      //   incomeAmount: 0,
      //   expenseAmount: 0,
      // };
      // const clothesCategory = {
      //   categoryName: 'Clothes',
      //   userId: userId,
      //   totalAmount: 0,
      //   incomeAmount: 0,
      //   expenseAmount: 0,
      // };
      // const entertainmentCategory = {
      //   categoryName: 'Entertainment',
      //   userId: userId,
      //   totalAmount: 0,
      //   incomeAmount: 0,
      //   expenseAmount: 0,
      // };
      // const festsCategory = {
      //   categoryName: 'Festivals',
      //   userId: userId,
      //   totalAmount: 0,
      //   incomeAmount: 0,
      //   expenseAmount: 0,
      // };

      // const categoryEducation =
      //   await this.categoryModel.create(educationCategory);
      // const categoryHealth = await this.categoryModel.create(healthCategory);
      // const categoryFood = await this.categoryModel.create(foodCategory);
      // const categoryClothes = await this.categoryModel.create(clothesCategory);
      // const categoryEntertainment = await this.categoryModel.create(
      //   entertainmentCategory,
      // );
      // const categoryOthers = await this.categoryModel.create(festsCategory);
      // return [
      //   categoryEducation,
      //   categoryHealth,
      //   categoryFood,
      //   categoryClothes,
      //   categoryEntertainment,
      //   categoryOthers,
      // ];
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel.find().exec();
      return categories;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const filter = { userId: id };
      const categories = await this.categoryModel.find(filter).exec();
      if (categories.length === 0) {
        throw new NotFoundException('User is not found');
      } else {
        return categories;
      }
      // const filteredCategories = categories.filter(
      //   (category) => category.userId.toString() === id,
      // );
      // return filteredCategories;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: error.message };
      } else {
        return { error: error };
      }
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }
  async updateOnAddIncome(id: string, amount: any) {
    try {
      const category = await this.categoryModel.findById(id);
      const incomeAmount = category.incomeAmount;
      const totalAmount = category.totalAmount;
      const updatedIncomeAmount = incomeAmount + amount;
      const updatedTotalAmount = totalAmount + amount;
      const targetCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        { incomeAmount: updatedIncomeAmount, totalAmount: updatedTotalAmount },
        { new: true, upsert: true },
      );
    } catch (error) {
      return error;
    }
  }

  async updateOnAddExpense(id: string, amount: any) {
    try {
      const category = await this.categoryModel.findById(id);
      const expenseAmount = category.expenseAmount;
      const totalAmount = category.totalAmount;
      const updatedExpenseAmount = expenseAmount + amount;
      const updatedTotalAmount = totalAmount + amount;
      const targetCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        {
          expenseAmount: updatedExpenseAmount,
          totalAmount: updatedTotalAmount,
        },
        { new: true, upsert: true },
      );
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
