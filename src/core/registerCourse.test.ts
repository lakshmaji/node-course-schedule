import { Course } from "../models/course";
import { Employee } from "../models/employee";
import { CoursesService } from "../services/course";
import { EmployeeService } from "../services/employee";
import addCourse from "./addCourse";
import registerCourse from "./registerCourse";

jest.useFakeTimers().setSystemTime(new Date("2022-11-03"));

describe("registerCourse", () => {
  let genRegistrationIdMock: jest.SpyInstance;
  let employeesMock: jest.SpyInstance;
  let addEmployeeMock: jest.SpyInstance;
  let coursesMock: jest.SpyInstance;
  let genOfferingIdMock: jest.SpyInstance;
  afterEach(() => {
    genRegistrationIdMock.mockClear();
    genOfferingIdMock.mockClear();
    employeesMock.mockClear();
    coursesMock.mockClear();
    addEmployeeMock.mockClear();
  });
  beforeEach(() => {
    addEmployeeMock = jest.spyOn(EmployeeService.prototype, "add");

    employeesMock = jest
      .spyOn(EmployeeService.prototype, "employees", "get")
      .mockImplementation(() => {
        const list: Employee[] = [
          {
            email: "gru@minions.com",
            registration_id: "COURSE-RUBY-LANG-STUART",
            course_id: "c123",
            status: true,
          },
        ];
        return list;
      });

    coursesMock = jest
      .spyOn(CoursesService.prototype, "courses", "get")
      .mockImplementation(() => {
        const list: Course[] = [
          {
            title: "Rails",
            instructor: "Stuart",
            date: "2022-11-03",
            min_employee_count: 1,
            max_employee_count: 2,
            offering_id: "COURSE-RAILS-STUART",
            timestamp: 16675708,
            status: true,
          },
        ];
        return list;
      });

    genRegistrationIdMock = jest.spyOn(
      EmployeeService.prototype,
      "genRegistrationId"
    );

    genOfferingIdMock = jest
      .spyOn(CoursesService.prototype, "findByOfferingId")
      .mockImplementation((input) => {
        if (input === "COURSE-RAILS-STUART" || input === "COURSE-RAILS-KEVIN") {
          return {
            title: "Rails",
            instructor: "Stuart",
            date: "2022-11-03",
            min_employee_count: 1,
            max_employee_count: 3,
            offering_id: input,
            timestamp: 16675708,
            status: true,
          } as Course;
        }
        return undefined;
      });
  });

  it("should return for invalid input", () => {
    const result = registerCourse();
    expect(result).toBe("INPUT_DATA_ERROR");
  });

  it("should invoke findByOfferingId", () => {
    registerCourse("gru@minions.com", "COURSE-RAILS-STUART");
    expect(genOfferingIdMock).toBeCalledTimes(1);
    expect(genOfferingIdMock).toHaveBeenCalledWith("COURSE-RAILS-STUART");
  });

  it("should invoke findByOfferingId", () => {
    const result = registerCourse("gru@minions.com", "COURSE-RAILS-START");
    expect(result).toBe("INPUT_DATA_ERROR");
    expect(genOfferingIdMock).toHaveBeenCalledWith("COURSE-RAILS-START");
  });

  it("should invoke genRegistrationIdMock", () => {
    registerCourse("gru@minions.com", "COURSE-RAILS-STUART");

    expect(genRegistrationIdMock).toHaveBeenCalledTimes(1);
    expect(genRegistrationIdMock).toHaveBeenCalledWith("gru", "Rails");
  });

  it("should invoke add employee", () => {
    registerCourse("gru@minions.com", "COURSE-RAILS-STUART");

    expect(addEmployeeMock).toHaveBeenCalledTimes(1);
    expect(addEmployeeMock).toHaveBeenCalledWith({
      registration_id: "REG-COURSE-gru-Rails",
      course_id: "COURSE-RAILS-STUART",
      email: "gru@minions.com",
      status: true,
    });
  });

  it("should not invoke add employee when max limit is reached", () => {
    genOfferingIdMock = jest
    .spyOn(CoursesService.prototype, "findByOfferingId")
    .mockImplementation((input) => {
      if (input === "COURSE-RAILS-STUART" || input === "COURSE-RAILS-KEVIN") {
        return {
          title: "Rails",
          instructor: "Stuart",
          date: "2022-11-03",
          min_employee_count: 1,
          max_employee_count: 1,
          offering_id: input,
          timestamp: 16675708,
          status: true,
        } as Course;
      }
      return undefined;
    });

    const result = registerCourse("gru@minions.com", "COURSE-RAILS-STUART");
    expect(result).toBe("COURSE_FULL_ERROR");

    expect(addEmployeeMock).toHaveBeenCalledTimes(0);
  });
});
