import { EntityRepository, Repository } from "typeorm";

import { Watched } from "../models";

@EntityRepository(Watched)
export class WatchedRepository extends Repository<Watched> {}
