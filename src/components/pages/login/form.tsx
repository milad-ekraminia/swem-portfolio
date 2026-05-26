import { memo, useState } from 'react';
import { LockSvg } from '@/assets/icons/lock-svg';
import { UserCircleSvg } from '@/assets/icons/user-circle-svg';
import { getCookie, setCookie } from '@/helpers/cookies';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  loginInitialValues,
  loginInitialValuesTypes,
  loginResolver,
} from '@/validations/login-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { loginApi } from '@/services/login/form-api';
import { Button } from '@/components/ui/button/button';
import ErrorContent from '@/components/ui/error-content/error-content';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';

const MemoLoginForm = () => {
  const currentLanguage = getCookie('CultureName');

  const [checked, setChecked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<loginInitialValuesTypes>({
    resolver: yupResolver(loginResolver),
    defaultValues: loginInitialValues,
  });

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      reset();
      setCookie('auth_token', data?.access_token, data?.expires_in);

      const redirectPath = localStorage.getItem('redirect_after_login');
      localStorage.removeItem('redirect_after_login');

      window.location.replace(
        redirectPath && redirectPath !== '/login' ? redirectPath : '/',
      );
    },
  });

  const submitHandler = async (formData: loginInitialValuesTypes) => {
    mutation.mutate(formData);
  };

  return (
    <div className="dv-login__content-section__content__form">
      <h1 className="dv-login__content-section__content__form__title">
        {getTranslatedValue('SolarWindEnergyManagement')}
      </h1>

      <form
        className="dv-login__content-section__content__form__box"
        onSubmit={handleSubmit(submitHandler)}
      >
        <RegisterInput
          label={
            currentLanguage
              ? getTranslatedValue('mobile_lang_placeholder_username')
              : 'Kullanıcı Adı'
          }
          register={register}
          name="username"
          autoComplete="off"
          autoFocus
          error={errors.username?.message}
          leftIcon={<UserCircleSvg />}
        />
        <RegisterInput
          label={
            currentLanguage
              ? getTranslatedValue('Password', 'AbpAccount.texts')
              : 'Şifre'
          }
          register={register}
          name="password"
          type={checked ? 'text' : 'password'}
          autoComplete="off"
          error={errors.password?.message}
          leftIcon={<LockSvg />}
          checkShowPasswordHandler={() => setChecked(!checked)}
        />

        <ErrorContent
          error={
            getTranslatedValue(
              mutation?.error && 'response' in mutation.error
                ? (mutation.error as any).response?.data?.error_description
                : null,
            ) ?? null
          }
        />

        <Button disabled={mutation?.isPending} variant="primary" type="submit">
          {mutation?.isPending ? (
            <ComponentLoader />
          ) : (
            <>
              {currentLanguage
                ? getTranslatedValue('mobile_lang_login_button')
                : 'Giriş Yap'}
            </>
          )}
        </Button>
        {/* </div> */}
      </form>
    </div>
  );
};

const LoginForm = memo(MemoLoginForm);

export default LoginForm;
