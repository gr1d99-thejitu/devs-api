import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user'

@Entity('developers')
export class Developer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    nullable: false
  })
  title: string

  @Column({
    nullable: false
  })
  user_id: string

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id'
  })
  user: User

  @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
  public readonly created_at: Date

  @UpdateDateColumn({ type: 'timestamptz', default: 'now()', onUpdate: 'now()' })
  public readonly updated_at: Date
}
