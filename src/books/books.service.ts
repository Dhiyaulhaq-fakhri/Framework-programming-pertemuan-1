import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { createbookdto } from './dto/create-book.dto.js';
import { error } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {}


    async findall(): Promise<Book[]> {
        return await this.bookRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findone(id: string): Promise<Book>{
        const book = await this.bookRepository.findOne({
            where: { id : id }
        })

        if(!book){
            throw new NotFoundException(`Buku ${id} tidak ditemukan`)
        }

        return book
    }

    async simpandata(createbookdto: createbookdto): Promise<Book> {
        const newbook = this.bookRepository.create({
            title: createbookdto.title,
            author: createbookdto.author,
            isbn: createbookdto.isbn,
            publishedYear: createbookdto.publishedyear,
            isAvailable: true,
        });

        return await this.bookRepository.save(newbook);
    }

    async updatedata(
        id: string,
        updatebookdto: createbookdto,
    ): Promise<Book> {
        const book = await this.bookRepository.findOneBy({ id });

        if (!book) {
            throw new NotFoundException(
                `Buku dengan id ${id} tidak ditemukan`,
            );
        }

        book.title = updatebookdto.title;
        book.author = updatebookdto.author;
        book.isbn = updatebookdto.isbn;
        book.publishedYear = updatebookdto.publishedyear;

        return await this.bookRepository.save(book);
    }

    async hapusdata(id: string): Promise<string> {
        const book = await this.bookRepository.findOneBy({ id });

        if (!book) {
            throw new NotFoundException(
                `Buku dengan id ${id} tidak ditemukan`,
            );
        }

        await this.bookRepository.softRemove(book);

        return `Buku dengan id ${id} berhasil dihapus`;
    }

}
