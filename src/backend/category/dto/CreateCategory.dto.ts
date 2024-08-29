import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    c_name: string;

    c_slug: string;
    c_avatar: string;
    c_banner: string;

    @IsNotEmpty()
    c_description: string;

    @IsNumber()
    c_parent_id: number;

    @IsNumber()
    c_hot: number;

    @IsNotEmpty()
    @IsNumber()
    c_status: number;
}

export default CreateCategoryDto;