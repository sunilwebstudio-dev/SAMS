import { supabase } from "../../config/supabase";
import { generateApplicationId } from "../../utils/generateApplicationId";

export async function signUpUser(data) {

  const {

    fullName,

    mobile,

    email,

    password,

    businessType,

  } = data;

  // Check if email already exists
const { data: existingEmail } = await supabase
  .from("profiles")
  .select("id")
  .eq("email", email)
  .maybeSingle();

if (existingEmail) {
  throw new Error(
    "This email is already registered. Please login."
  );
}

// Check if mobile already exists
const { data: existingMobile } = await supabase
  .from("profiles")
  .select("id")
  .eq("mobile", mobile)
  .maybeSingle();

if (existingMobile) {
  throw new Error(
    "This mobile number is already registered."
  );
}

  // Generate Application ID
  const applicationId = generateApplicationId();

  // Create Auth User
  const { data: authData, error } =
    await supabase.auth.signUp({

      email,

      password,

      options: {

        emailRedirectTo:
          window.location.origin + "/login",

      },

    });

  if (error) {

    throw error;

  }
/*
  // Save Profile
  const { error: profileError } =
    await supabase

      .from("profiles")

      .insert({

        auth_id: authData.user.id,

        application_id: applicationId,

        full_name: fullName,

        mobile,

        email,

        business_type: businessType,

      });

  if (profileError) {

    throw profileError;

  }
*/
  return {
  authData,
  applicationId,
};

}

// ----------------------------

export async function loginUser(

  identifier,

  password

) {

  let email = identifier;

  // Mobile or Application ID
  if (

    !identifier.includes("@")

  ) {

    const {

      data: profile,

      error: profileError,

    } = await supabase

      .from("profiles")

      .select("email")

      .or(

        `mobile.eq.${identifier},application_id.eq.${identifier}`

      )

      .maybeSingle();

    if (

      profileError ||

      !profile

    ) {

      throw new Error(

        "Account not found"

      );

    }

    email = profile.email;

  }

  const {

    data,

    error,

  } = await supabase.auth.signInWithPassword({

    email,

    password,

  });

  if (error) {

    throw error;

  }

  return data;

}

// ----------------------------

export async function logoutUser() {

  await supabase.auth.signOut();

}

// ----------------------------

export async function getCurrentUser() {

  const {

    data,

  } = await supabase.auth.getUser();

  return data.user;

}