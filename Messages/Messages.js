const MESSAGES = {
  EN: {
    USER: {
      UNAUTHORIZED: "You're not an authorized user!",
      USERNAME: "Username exists! Please choose another one.",
      INVALID_USERNAME: "The username must consist of at least 4 characters!",
      PASSWORD: "Weak Password!",
      FIRST_NAME: "Invalid First Name!",
      LAST_NAME: "Invalid Last Name!",
      EMAIL: "Invalid Email Address!",
      MOBILE: "Invalid Mobile Number!",
      ADDRESS: "Invalid Home Address!",
      ADDRESS_LENGTH:
        "The home address must consist of at least 20 characters!",
      EMAIL_CONFIRMATION: "Please confirm your email!",
      EMAIL_EXISTS: "Email exists! Please choose another one.",
      INCOMPLETE_PROFILE: "Your profile is incomplete!",
      REQUESTED_VERIFICATION: (hr) =>
        `You've requested the account verification URL before now! Please check your email inbox within ${hr} hr(s).`,
      VERIFIED_ACCOUNT: "Your account is already verified!",
      VERIFICATION_URL: "Provided account verification URL is incorrect!",
      EXPIRED_VERIFICATION_URL: "Your account verification URL is expired!",
      INEXISTENT_VERIFICATION_REQUEST:
        "You didn't request a verification URL before!",
      FAILED_MAIL: "Email failed to send! Please try again later.",
      REQUESTED_PASSWORD_RESET: (hr) =>
        `You've requested the password reset URL before now! Please check your email inbox within ${hr} hr(s).`,
      PASSWORD_RESET_NOT_REQUESTABLE: (hr) =>
        `You can only request a password reset after ${hr} hr(s).`,
      UNVERIFIED_ACCOUNT:
        "Your account is not verified! Please verify your account before requesting a password reset or resetting the password.",
      PASSWORD_RESET_URL: "Provided password reset URL is incorrect!",
      EXPIRED_PASSWORD_RESET_URL: "Your password reset URL is expired!",
      INEXISTENT_PASSWORD_RESET_REQUEST:
        "You didn't request a password reset URL before!",
      USER_TYPE_ID: "Invalid User Account's Type!",
      USERS_LIST: "You have no privilege to retrieve users list!",
      USER_CREATION: "You have no privilege to create a user account!",
      SA_CREATION: "You can't create a super admin account!",
      USER_DELETION: "You have no privilege to delete a user account!",
      SA_DELETION: "You can't delete a super admin account!",
      USER_TYPE_CHANGE:
        "You have no privilege to change a user account's type!",
      SA_TYPE_CHANGE: "You can't change a super admin account's type!",
      SA_TYPE_ASSIGN: "You can't assign a super admin role (account's type)!",
      ADMIN_TYPE_CHANGE:
        "You have no privilege to change an admin's account type!",
      ADMIN_TYPE_ASSIGN:
        "You have no privilege to assign admin roles (account's types)!",
      UNCHANGED_USER_TYPE: "Please choose a new user account type!",
      UNCHANGED_LOCATION: "Please choose a new location!",
      LOCATION_CHANGE: "You have no privilege to change a user's location!",
      ADMIN_LOCATION_CHANGE:
        "You have no privilege to change location of admins!",
      SA_LOCATION_CHANGE: "You can't change location of super admins!",
      INEXISTENT_USER: "The user account is inexistent!",
      CREDENTIAL_CHECK: "Incorrect username or email address!",
      PASSWORD_CHECK: "Incorrect Password!",
      PASSWORD_CONFIRMATION: "Please confirm your password!",
      PASSWORD_UNCHANGED: "Please enter a new password!",
      SUCCESSFULL_PASSWORD_CHANGE: "Your password changed successfully.",
      SUCCESSFULL_CREATION: "User account created successfully.",
      SUCCESSFULL_UPDATE: "Your data updated successfully.",
      SUCCESSFULL_DELETION: "'s account deleted successfully.",
      SUCCESSFULL_USER_TYPE_CHANGE:
        "User account's type changed successfully to ",
      SUCCESSFULL_LOCATION_CHANGE: "User's location changed successfully to ",
      SUCCESSFULL_VERIFICATION_URL_REQUEST:
        "Your account verification URL has been successfully requested. Please check your email inbox within 48 hours.",
      SUCCESSFULL_PASSWORD_RESET_URL_REQUEST:
        "Your password reset URL has been successfully requested. Please check your email inbox within 24 hours.",
      SUCCESSFULL_ACCOUNT_VERIFICATION:
        "Your account is verified successfully.",
    },
    LOCATION: {
      LOCATION_CREATION: "You have no privilege to add a new location!",
      INVALID_LOCATION_TITLE: "Location's title is invalid!",
      USED_LOCATION_TITLE: "Please enter a new location's title!",
      LOCATION_UPDATE: "You have no privilege to update a location's data!",
      UNEDITABLE_LOCATION: "You can't update this locations's data!",
      LOCATION_DELETION: "You have no privilege to delete a location!",
      UNDELETABLE_LOCATION: "You can't delete this location!",
      INEXISTENT_LOCATION: "The location is inexistent!",
      SUCCESSFULL_CREATION: "The new location added successfully.",
      SUCCESSFULL_UPDATE: "Location's data updated successfully.",
      SUCCESSFULL_DELETION: "The location deleted successfully.",
    },
  },
  AR: {
    USER: {
      UNAUTHORIZED: "أنت لست مستخدم مصرَّح به",
      USERNAME: "اسم المستخدم موجود مسبقًا، رجاءً اختر واحد آخر",
      INVALID_USERNAME: "يجب أن يتكوّن اسم المستخدم من 4 أحرف على الأقل",
      PASSWORD: "كلمة السر ضعيفة",
      FIRST_NAME: "الاسم الأول غير صالح",
      LAST_NAME: "الاسم الأخير غير صالح",
      EMAIL: "البريد الإلكتروني غير صالح",
      MOBILE: "رقم الخلوي غير صالح",
      ADDRESS: "عنوان المنزل غير صالح",
      ADDRESS_LENGTH: "يجب أن يتكوّن عنوان المنزل من 20 حرف على الأقل",
      EMAIL_CONFIRMATION: "رجاءً قم(ي) بتأكيد بريدك( ِ)الإلكتروني",
      EMAIL_EXISTS: "البريد الإلكتروني موجود مسبقًا، رجاءً اختر واحد آخر",
      INCOMPLETE_PROFILE: "ملف حسابك غير مكتمل",
      REQUESTED_VERIFICATION: (hr) =>
        `لقد طالبت( ِ) برابط التحقق من حسابك( ِ) قبل الآن، رجاءً تفقد(ي) صندوق بريدك( ِ) الإلكتروني خلال ${hr} ساعة أو ساعات`,
      VERIFIED_ACCOUNT: "تم التحقق من حسابك( ِ) قبل الآن",
      VERIFICATION_URL: "إن رابط التحقق من الحساب الذي تم إدخاله غير صحيح",
      EXPIRED_VERIFICATION_URL: "إن رابط التحقق من حسابك( ِ) منتهي الصلاحية",
      INEXISTENT_VERIFICATION_REQUEST:
        "أنت( ِ) لم تقم(ي) بطلب رابط التحقق من الحساب قبل الآن",
      FAILED_MAIL:
        "فشلت عملية إرسال البريد الإلكتروني، رجاءً حاول مرة أخرى لاحقًا",
      REQUESTED_PASSWORD_RESET: (hr) =>
        `لقد طالبت( ِ) برابط إعادة تعيين كلمة المرور قبل الآن، رجاءً تفقد(ي) صندوق بريدك( ِ) الإلكتروني خلال ${hr} ساعة أو ساعات`,
      PASSWORD_RESET_NOT_REQUESTABLE: (hr) =>
        `لا يمكنك( ِ) طلب تعيين كلمة المرور إلا بعد مرور ${hr} ساعة أو ساعات`,
      UNVERIFIED_ACCOUNT:
        "لم يتم التحقق من حسابك( ِ) من قبل، رجاءً قم(ي) بالتحقق من الحساب قبل إعادة/طلب إعادة تعيين كلمة المرور",
      PASSWORD_RESET_URL:
        "إن رابط إعادة تعيين كلمة المرور الذي تم إدخاله غير صحيح",
      EXPIRED_PASSWORD_RESET_URL:
        "إن رابط إعادة تعيين كلمة المرور منتهي الصلاحية",
      INEXISTENT_PASSWORD_RESET_REQUEST:
        "أنت( ِ) لم تقم(ي) بطلب رابط إعادة تعيين كلمة المرور قبل الآن",
      USER_TYPE_ID: "نوع حساب المستخدم غير صالح",
      USERS_LIST: "ليست لديك( ِ) الصلاحية للحصول على اللائحة بالمستخدمين",
      USER_CREATION: "ليست لديك( ِ) الصلاحية لإضافة حساب المستخدم",
      SA_CREATION: "لا يمكنك( ِ) إضافة مسؤول أعلى",
      USER_DELETION: "ليست لديك( ِ) الصلاحية لإزالة حساب المستخدم",
      SA_DELETION: "ليست لديك( ِ) الصلاحية لإزالة مسؤول أعلى",
      USER_TYPE_CHANGE: "ليست لديك( ِ) الصلاحية لتغيير نوع حساب المستخدم",
      SA_TYPE_CHANGE: "لا يمكنك( ِ) تغيير نوع حساب المسؤول الأعلى",
      SA_TYPE_ASSIGN: "لا يمكنك( ِ) إضافة دور (نوع حساب) مسؤول أعلى",
      ADMIN_TYPE_CHANGE: "ليست لديك( ِ) الصلاحية لتغيير نوع حساب مسؤول",
      ADMIN_TYPE_ASSIGN: "ليست لديك( ِ) الصلاحية لإضافة دور (نوع حساب) مسؤول",
      UNCHANGED_USER_TYPE: "رجاءً اختر(ي) نوع جديد لحساب المستخدم",
      UNCHANGED_LOCATION: "رجاءً اختر(ي) موقع جديد للمستخدم",
      LOCATION_CHANGE: "ليست لديك( ِ) الصلاحية لتغيير موقع المستخدم",
      ADMIN_LOCATION_CHANGE: "ليست لديك( ِ) الصلاحية لتغيير موقع إحد المسؤولين",
      SA_LOCATION_CHANGE: "لا يمكنك( ِ) تغيير موقع مسؤول أعلى",
      INEXISTENT_USER: "إن حساب المستخدم غير موجود في الأساس",
      CREDENTIAL_CHECK: "إن البريد الإلكتروني أو اسم حساب المستخدم غير صحيح",
      PASSWORD_CHECK: "إن كلمة المرور غير صحيحة",
      PASSWORD_CONFIRMATION: "رجاءً قم(ي) بتأكيد كلمة المرور",
      PASSWORD_UNCHANGED: "رجاءً قم(ي) بإدخال كلمة مرور جديدة",
      SUCCESSFULL_PASSWORD_CHANGE: "تم تغيير كلمة مرورك( ِ) بنجاح",
      SUCCESSFULL_CREATION: "تم إضافة حساب المستخدم بنجاح",
      SUCCESSFULL_UPDATE: "تم تعديل بياناتك( ِ) بنجاح",
      SUCCESSFULL_DELETION: " تمت بنجاح عملبة حذف حساب",
      SUCCESSFULL_USER_TYPE_CHANGE: "تم تعديل نوع حساب المستخدم بنجاح إلى ",
      SUCCESSFULL_LOCATION_CHANGE: "تم تعديل موقع المستخدم إلى ",
      SUCCESSFULL_VERIFICATION_URL_REQUEST:
        "تم طلب رابط التحقق من حسابك( ِ) بنجاح، رجاءً قم(ي) بتفقد صندوق بريدك( ِ) الإلكتروني خلال 48 ساعة",
      SUCCESSFULL_PASSWORD_RESET_URL_REQUEST:
        "تم طلب رابط إعادة تعيين كلمة مرورك( ِ) بنجاح، رجاءً قم(ي) بتفقد صندوق بريدك( ِ) الإلكتروني خلال 24 ساعة",
      SUCCESSFULL_ACCOUNT_VERIFICATION: "تم التحقق من حسابك( ِ) بنجاح",
    },
    LOCATION: {
      LOCATION_CREATION: "ليست لديك( ِ) الصلاحية لإضافة موقع جديد",
      INVALID_LOCATION_TITLE: "عنوان الموقع غير صالح",
      USED_LOCATION_TITLE: "رجاءً قم(ي) بإدخال عنوان جديد للموقع",
      LOCATION_UPDATE: "ليست لديك( ِ) الصلاحية لتعديل بيانات أي موقع",
      UNEDITABLE_LOCATION: "لا يمكنك( ِ) تعديل بيانات هذا الموقع",
      LOCATION_DELETION: "ليست لديك( ِ) الصلاحية لحذف أي موقع",
      UNDELETABLE_LOCATION: "لا يمكنك( ِ) حذف هذا الموقع",
      INEXISTENT_LOCATION: "إن الموقع غير موجود في الأساس",
      SUCCESSFULL_CREATION: "تم إضافة الموقع الجديد بنجاح",
      SUCCESSFULL_UPDATE: "تم تعديل بيانات الموقع بنجاح",
      SUCCESSFULL_DELETION: "تم حذف الموقع بنجاح",
    },
  },
  FAILURE: (message) => ({
    message,
    status: "failure",
  }),
  SUCCESS: (message) => ({
    message,
    status: "success",
  }),
};

module.exports = MESSAGES;
