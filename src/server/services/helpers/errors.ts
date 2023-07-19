export enum ServiceErrorCode {
  CourseCanceledNoModification,
  FewerSlotsThanRegistered,
  CourseAlreadyCanceled,
  CourseHasPassed,
  CalendarNotFound,
  CalendarNotAllowed,
  CoursePassedNoRegistration,
  CourseCanceledNoRegistration,
  CourseFullNoRegistration,
  UserAlreadyRegistered,
  CoursePassedNoUnregistration,
  CourseCanceledNoUnregistration,
  UserNotRegistered,
  UserCannotBeDisabled,
  CourseCanceledAttendance,
  UserNotRegisteredAttendance,
  UserCannotManageThemselves,
  UserAlreadyManages,
  UserCannotControlUser,
  UserCannotBeDeleted,
  CouponAlreadyDisabled,
  MembershipAlreadyDisabled,
  OrderCourseRegistrationNotRegistered,
  OrderCourseRegistrationAlreadyOrdered,
  OrderCourseRegistrationReplacementNotOrdered,
  OrderCourseRegistrationReplacementAlreadyReplaced,
  OrderCourseRegistrationReplacementNotCancelled,
  OrderCourseRegistrationCouponFull,
  OrderCouponAlreadyOrdered,
  OrderMembershipAlreadyOrdered,
  OrderPaymentAmountMismatch,
  CoursePriceCannotBeModified,
  UserHasNoCoupons,
  UsersCannotBeMerged,
  OrderCannotInferRecipient,
  OrderInvoiceInapplicable,
}

export class ServiceError<T extends ServiceErrorCode> extends Error {
  constructor(public readonly code: T) {
    super(`${ServiceErrorCodeMessages[code]}`);
    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}

export const ServiceErrorCodeMessages: { [K in ServiceErrorCode]: string } = {
  [ServiceErrorCode.CourseCanceledNoModification]: `La séance ne peut plus être modifiée`,
  [ServiceErrorCode.FewerSlotsThanRegistered]: `Le nombre de places ne peut pas être inférieur au nombre d'inscrits`,
  [ServiceErrorCode.CourseAlreadyCanceled]: `La séance a déjà été annulée`,
  [ServiceErrorCode.CourseHasPassed]: `La séance est passée et ne peut pas être modifiée`,
  [ServiceErrorCode.CalendarNotFound]: `Le calendrier n'a pas été trouvé`,
  [ServiceErrorCode.CalendarNotAllowed]: `L'utilisateur n'est pas autorisé à accéder à ce calendrier`,
  [ServiceErrorCode.CoursePassedNoRegistration]: `Les inscriptions pour cette séance sont fermées`,
  [ServiceErrorCode.CourseCanceledNoRegistration]: `La séance est annulée et n'accepte donc pas d'inscriptions`,
  [ServiceErrorCode.CourseFullNoRegistration]: `La séance est pleine`,
  [ServiceErrorCode.UserAlreadyRegistered]: `L'utilisateur est déjà inscrit à cette séance`,
  [ServiceErrorCode.CoursePassedNoUnregistration]: `Les inscriptions pour cette séance ne peuvent plus être modifiées`,
  [ServiceErrorCode.CourseCanceledNoUnregistration]: `La séance est annulée donc les inscriptions ne peuvent plus être modifiées`,
  [ServiceErrorCode.UserNotRegistered]: `L'utilisateur n'est pas inscrit à cette séance`,
  [ServiceErrorCode.UserCannotBeDisabled]: `L'utilisateur est un administrateur et ne peut donc pas être désactivé`,
  [ServiceErrorCode.CourseCanceledAttendance]: `La séance est annulée donc la présence ne peut plus être modifiée`,
  [ServiceErrorCode.UserNotRegisteredAttendance]: `L'utilisateur n'est pas inscrit à cette séance`,
  [ServiceErrorCode.UserCannotManageThemselves]: `L'utilisateur ne peut pas être supervisé par lui-même`,
  [ServiceErrorCode.UserAlreadyManages]: `L'utilisateur supervise un utilisateur et ne peut donc pas être supervisé à son tour`,
  [ServiceErrorCode.UserCannotControlUser]: `L'utilisateur ne peut pas effectuer d'action pour l'utilisateur donné`,
  [ServiceErrorCode.UserCannotBeDeleted]: `L'utilisateur ne peut pas être supprimé car certaines données liées à son compte seraient perdues`,
  [ServiceErrorCode.CouponAlreadyDisabled]: `La carte est déjà désactivée`,
  [ServiceErrorCode.MembershipAlreadyDisabled]: `L'adhésion est déjà annulée`,
  [ServiceErrorCode.OrderCourseRegistrationNotRegistered]: `L'utilisateur est désinscrit de la séance`,
  [ServiceErrorCode.OrderCourseRegistrationAlreadyOrdered]: `La séance fait déjà partie d'un paiement`,
  [ServiceErrorCode.OrderCourseRegistrationReplacementNotOrdered]: `La séance à remplacer ne fait pas partie d'un paiement`,
  [ServiceErrorCode.OrderCourseRegistrationReplacementAlreadyReplaced]: `La séance à remplacer a déjà été remplacée`,
  [ServiceErrorCode.OrderCourseRegistrationReplacementNotCancelled]: `La séance à remplacer n'a pas été annulée et l'inscription est toujours active`,
  [ServiceErrorCode.OrderCourseRegistrationCouponFull]: `La coupon est plein`,
  [ServiceErrorCode.OrderCouponAlreadyOrdered]: `La carte fait déjà partie d'un paiement`,
  [ServiceErrorCode.OrderMembershipAlreadyOrdered]: `L'adhésion fait déjà partie d'un paiement`,
  [ServiceErrorCode.OrderPaymentAmountMismatch]: `Le montant payé ne correspond pas au total des articles`,
  [ServiceErrorCode.CoursePriceCannotBeModified]: `Le prix de la séance ne peut plus être modifié`,
  [ServiceErrorCode.UserHasNoCoupons]: `L'utilisateur ne possède aucune carte qui puisse être utilisée`,
  [ServiceErrorCode.UsersCannotBeMerged]: `Ces utilisateurs ne peuvent pas être fusionnés`,
  [ServiceErrorCode.OrderCannotInferRecipient]: `Le bénéficiaire ne peut pas être déduit à partir des articles de ce paiement`,
  [ServiceErrorCode.OrderInvoiceInapplicable]: `Une facture ne peut pas être générée pour ce type de paiement`,
};
