import { IsInt, IsNotEmpty } from "class-validator";

export class createbookdto {

    @IsNotEmpty({message: 'Title harus diisi'})
    readonly title: string;

    @IsNotEmpty({message: 'Author harus diisi'})
    readonly author: string;

    @IsNotEmpty({message: 'ISBN harus diisi'})
    readonly isbn: string;

    @IsNotEmpty({message: 'Published year harus diisi'})
    @IsInt({message: 'Published year harus angka'})
    readonly publishedyear: number;

}