import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    pro_name: string;

    @IsNotEmpty()
    pro_slug: string;

    @IsNotEmpty()
    @IsNumber()
    pro_price: number;

    @IsNotEmpty()
    @IsNumber()
    pro_category_id: number;

    pro_number: number | 0;

    @IsNotEmpty()
    @IsNumber()
    pro_admin_id: number | 0;
    pro_sale: number | 0;
    pro_avatar: string;
    pro_view: number | 0;
    pro_hot: number | 0;
    pro_manufacturer_id: number | 0;
    pro_active: number | 0;
    pro_pay: number | 0;
    pro_description: string;
    pro_content: string;
    pro_review_total: number | 0;
    pro_review_star: number | 0;
    pro_configuration: string;
}

export default CreateProductDto;