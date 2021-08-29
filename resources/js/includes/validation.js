import {Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure} from 'vee-validate';
import {required, min, max, alpha_spaces as alphaSpaces, alpha_spaces, email, min_value as minVal, max_value as maxVal, confirmed, not_one_of as exclude} from '@vee-validate/rules';
export default {
    install(app){
        app.component('VeeForm', VeeForm);
        app.component('VeeField', VeeField);
        app.component('ErrorMessage', ErrorMessage);

        defineRule('required', required);
        defineRule('tos', required);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alpha_spaces', alpha_spaces);
        defineRule('email', email);
        defineRule('min_value', minVal);
        defineRule('max_value', maxVal);
        defineRule('password_missmatch', confirmed);
        defineRule('exclude', exclude);
        defineRule('country_exclude', exclude);

        // custome error
        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required : `The Field ${ctx.field} is required.`,
                    min: `The Field ${ctx.field} is too short.`,
                    max: `The Field ${ctx.field} is too longs`,
                    alpha_spaces: `The Field ${ctx.field} may only contain alphabetical character and spaces`,
                    email: `The Field ${ctx.field} must be a valid email`,
                    min_value: `The Field ${ctx.field} is too low`,
                    max_value: `The Field ${ctx.field} is too high`,
                    exclude: `Your Not Allowed to use This Value ${ctx.field} `,
                    country_exclude: `Due to restrictions , we do not accept user to use this location`,
                    password_missmatch: "The Password Doesnt Match",
                    tos: "You Must Accept the TA",
                };
                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The Field ${ctx.field} is invalid`;
                return message;
            },

            // validation Trigered
            validateOnBlur: true,
            validateOnModelUpdate: true,
            validateOnChange: true,
            validateOnInput: false
        });
    },

}
