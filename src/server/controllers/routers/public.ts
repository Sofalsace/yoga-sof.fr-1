import { findCourseModels, findCourses } from '../../services';
import { Prisma } from '@prisma/client';
import { procedure, router } from '../trpc';
import { prisma } from '../../prisma';

export const publicRouter = router({
  findAllModels: procedure
    .query(async () => findCourseModels()),
  findAllFutureCourses: procedure
    .query(async () => {
      const date = new Date();
      const courses = await prisma.course.findMany({ where: { dateStart: { gt: date }, isCanceled: false }, include: { registrations: true }, orderBy: { dateStart: 'asc' } });
      return courses.map(({ id, type, slots, price, dateStart, dateEnd, registrations }) => ({
        id, type, slots, price, dateStart, dateEnd,
        registrations: registrations.filter(({ isUserCanceled }) => !isUserCanceled).length,
      }));
    }),
});
