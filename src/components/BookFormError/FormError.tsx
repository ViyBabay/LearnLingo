import { ErrorMessage } from "formik";

export const FormError = ({ name }) => {
  return <ErrorMessage name={name} render={(message) => <p>{message}</p>} />;
};

// export const ErrorText = styled.p`
//   width: 100%;

//   color: ${({ theme }) => theme.colors.red};
//   font-style: italic;
//   font-size: ${({ theme }) => theme.fontSizes.xs};
//   text-align: center;

//   @media screen and (max-width: 768px) {
//     text-align: center;
//   }
// `;
