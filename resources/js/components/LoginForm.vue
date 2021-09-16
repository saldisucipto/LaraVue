<template>
    <div>
        <vee-form :validation-schema="loginSchema" @submit="loginActions">
            <!-- Alert -->
            <div
                class="text-white text-center font-bold p-5"
                v-if="login_show_alert"
                :class="login_alert_variant"
            >
                {{ login_alert_message }}
            </div>
            <!-- Email -->
            <div class="mb-3">
                <label class="inline-block mb-2">Email</label>
                <vee-field
                    type="email"
                    name="email"
                    class="
                        block
                        w-full
                        py-1.5
                        px-3
                        text-gray-800
                        border border-gray-300
                        transition
                        duration-500
                        focus:outline-none focus:border-black
                        rounded
                    "
                    placeholder="Enter Email"
                />
                <ErrorMessage class="text-red-600" name="email" />
            </div>
            <!-- Password -->
            <div class="mb-3">
                <label class="inline-block mb-2">Password</label>
                <vee-field
                    name="password"
                    type="password"
                    class="
                        block
                        w-full
                        py-1.5
                        px-3
                        text-gray-800
                        border border-gray-300
                        transition
                        duration-500
                        focus:outline-none focus:border-black
                        rounded
                    "
                    placeholder="Password"
                />
                <ErrorMessage class="text-red-600" name="password" />
            </div>
            <button
                :disabled="login_in_submission"
                type="submit"
                class="
                    block
                    w-full
                    bg-purple-600
                    text-white
                    py-1.5
                    px-3
                    rounded
                    transition
                    hover:bg-purple-700
                "
            >
                Submit
            </button>
        </vee-form>
    </div>
</template>

<script>
// import { mapMutations, mapGetters } from "vuex";

export default {
    name: "LoginForm",
    data() {
        return {
            loginSchema: {
                // name field
                email: "required|email",
                password: "required|min:3|max:100",
            },
            login_in_submission: false,
            login_show_alert: false,
            login_alert_variant: "bb-blue-500",
            login_alert_message: "Please Wait, Your Account Being Created",
        };
    },
    methods: {
        loginActions(values) {
            this.login_show_alert = true;
            this.login_alert_variant = "bg-blue-500";
            this.login_alert_message = "Please Wait, Your Login is Procesed";
            this.$store
                .dispatch("login", values)
                .then((response) => {
                    this.login_alert_variant = "bg-green-500";
                    this.login_alert_message = `Success, ${response.data.message}`;
                    this.login_in_submission = true;
                })
                .catch((error) => {
                    this.error = error.response;
                });
            // method properties teggle Modal
        },
    },
};
</script>
