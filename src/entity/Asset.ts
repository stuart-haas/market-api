import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated, BaseEntity } from 'typeorm';

@Entity()
export class Asset extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  path: string

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date

  @Column()
  @Generated("uuid")
  uid: string
}