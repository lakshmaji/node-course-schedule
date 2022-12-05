import { Employee } from "../models/employee";

/**
 * A singleton class to access and modify
 * employee records
 */
export class EmployeeService {
  private static instance: EmployeeService;

  private _employees: Employee[] = [];

  public static getInstance(): EmployeeService {
    if (!EmployeeService.instance) {
      EmployeeService.instance = new EmployeeService();
    }

    return EmployeeService.instance;
  }

  public add(employee: Employee) {
    this._employees.push(employee);
  }

  public replace(employees: Employee[]) {
    this._employees = employees;
  }

  /**
   * Returns a unique registration id with instructor's name and employee name
   * 
   * @param instructor_name 
   * @param name 
   * @returns unique id
   */
  public genRegistrationId(instructor_name: string, name: string): string {
    return `REG-COURSE-${instructor_name}-${name}`;
  }

  get employees(): Employee[] {
    return this._employees;
  }
}
