import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Generated, BaseEntity } from 'typeorm';
import { SessionEntity } from 'typeorm-store'

@Entity()
export class Session extends BaseEntity implements SessionEntity {
    @PrimaryColumn()
    id: string

    @Column()
    expiresAt: number

    @Column({type: "text"})
    data: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date
  
    @Column()
    @Generated("uuid")
    uid: string
}