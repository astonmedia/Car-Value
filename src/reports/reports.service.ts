import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  findAll() {
    const reports = this.repo.find();
    return reports;
  }

  async delete(id: number) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return this.repo.remove(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
