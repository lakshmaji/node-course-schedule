import { CoursesService } from "./services/course";
import { EmployeeService } from "./services/employee";

export interface CachableArgs {
  courses_svc: CoursesService;
  employees_svc: EmployeeService;
}

/**
 * Abstracts away the retrieval logic and provides unified service objects
 * for invoked function
 * @param fn
 * @returns
 */
const withStore = <T extends unknown>(fn: (args: CachableArgs) => Function) => {
  const courses_svc = CoursesService.getInstance();
  const employees_svc = EmployeeService.getInstance();

  return (...props: T[]) => {
    return fn({ courses_svc, employees_svc })(...props);
  };
};

export default withStore;
