import { Project } from "./project";
import { Meta } from "./index";

export interface Projects {
  current_page: number;
  data: Project[];
  meta: Meta;
}
