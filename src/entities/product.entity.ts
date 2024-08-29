import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Category from './category.entity';
 
@Entity('products')
class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 191 })
  pro_name: string;

  @Column({ type: 'varchar', length: 191 })
  pro_slug: string;

  @Column({ type: 'int' })
  pro_price: number;

  @Column({ type: 'int' })
  pro_category_id: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "pro_category_id"})
  category: Category[];

  @Column({ type: 'int', default: 0 })
  pro_number: number;

  @Column({ type: 'int', default: 0 })
  pro_admin_id: number;

  @Column({ type: 'tinyint', default: 0 })
  pro_sale: number;

  @Column({ type: 'varchar', length: 191, nullable: true })
  pro_avatar: string;

  @Column({ type: 'int', default: 0 })
  pro_view: number;

  @Column({ type: 'tinyint', default: 0 })
  pro_hot: number;

  @Column({ type: 'int', default: 0 })
  pro_manufacturer_id: number;

  @Column({ type: 'tinyint', default: 1 })
  pro_active: number;

  @Column({ type: 'int', default: 0 })
  pro_pay: number;

  @Column({ type: 'mediumtext', nullable: true })
  pro_description: string;

  @Column({ type: 'text', nullable: true })
  pro_content: string;

  @Column({ type: 'int', default: 0 })
  pro_review_total: number;

  @Column({ type: 'int', default: 0 })
  pro_review_star: number;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
  pro_configuration: string;
}

export default Product;