import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product.entity';
 
@Entity('categories')
class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 191 })
  c_name: string;

  @Column({ type: 'varchar', length: 191 })
  c_slug: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  c_avatar: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  c_banner: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  c_description: string;

  @Column({ type: 'int', default: 0 })
  c_parent_id: number;

  @Column({ type: 'tinyint', default: 0 })
  c_hot: number;

  @Column({ type: 'tinyint', default: 1 })
  c_status: number;

  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn({name: "id", referencedColumnName: "pro_category_id"})
  products: Product[]


  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

export default Category;