export interface Course {
    title: string;
    instructor: string;
    date: string;
    min_employee_count: number;
    max_employee_count: number;
    // course offering id
    offering_id: string;
    timestamp: number;
    status: boolean;
}

export enum CourseStatus {
    CONFIRMED = 'CONFIRMED',
    CANCELED = 'COURSE_CANCELED'
}