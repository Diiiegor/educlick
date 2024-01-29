import Course from "../Models/Course";

export default interface IScraper {
    baseUrl: string;

    fetchCourses():Promise<Course[]>
}