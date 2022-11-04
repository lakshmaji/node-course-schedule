import { Course } from "../models/course";
import { Employee } from "../models/employee";
import { CoursesService } from "../services/course";
import { EmployeeService } from "../services/employee";
import addCourse from "./addCourse";
import courseAllotment from "./courseAllotment";
import registerCourse from "./registerCourse";

jest.useFakeTimers().setSystemTime(new Date("2022-11-03"));

describe("courseAllotment", () => {
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
            registration_id: "PYTHON",
            course_id: "OFFERING-PYTHON-OTTO",
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
        if (input === "OFFERING-PYTHON-OTTO") {
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
    const result =  courseAllotment()
    expect(result).toBe("INPUT_DATA_ERROR");
  });

  it("should return for valid input", () => {
    const result =  courseAllotment('OFFERING-PYTHON-OTTO')
    expect(result).toBe("PYTHON gru@minions.com OFFERING-PYTHON-OTTO Rails Stuart 2022-11-03 CONFIRMED\n");
  });


});
