import { Course } from "../models/course";

/**
 * A singleton class to access and modify
 * course records
 */
export class CoursesService {
  private static instance: CoursesService;

  private _courses: Course[] = [];

  public static getInstance(): CoursesService {
    if (!CoursesService.instance) {
      CoursesService.instance = new CoursesService();
    }

    return CoursesService.instance;
  }

  public add(course: Course) {
    this._courses.push(course);
  }

  get courses(): Course[] {
    return this._courses;
  }

  public findByOfferingId(id: string): Course | void {
    return this._courses.find((o) => o.offering_id === id);
  }

  public genOfferingId(name: string, instructor: string): string {
    return `OFFERING-${name}-${instructor}`;
  }
}
