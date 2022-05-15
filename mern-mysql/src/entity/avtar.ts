import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Avtar{

	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable:false})
	url: string;

	@Column({ nullable: false })
	public_id: string;
	
}