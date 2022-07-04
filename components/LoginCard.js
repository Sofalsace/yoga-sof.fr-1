import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Form as FinalForm } from 'react-final-form';
import { joiValidator, providersData } from '../lib/client';
import { EMAIL_CONTACT, schemaSignInEmail, schemaSignInExternal } from '../lib/common';
import { ErrorMessage } from './ErrorMessage';
import { FloatingInputField } from './form/fields';

export function LoginCard({ providers }) {
  const router = useRouter();
  const { error } = router.query;

  const errorMessages = {
    Verification: 'Le lien que vous avez suivi est probablement périmé.',
    OAuthAccountNotLinked: 'Il semble que vous vous vous soyez déjà connecté depuis un autre service. Merci de réutiliser ce service pour vous connecter.',
    AccessDenied: `Votre compte a été désactivé par un administrateur, si vous pensez qu'il s'agit d'une erreur merci de nous écrire.`,
  };

  const [isLoading, setLoading] = useState(false);

  const handleSubmitFor = providerId => data => {
    setLoading(true);
    signIn(providerId, { callbackUrl: `${window.location.origin}/redirection`, ...data })
      .catch(() => setLoading(false));
    // By assumption, any successful promise resolution will redirect (so we stay in the loading state)
  };

  const handleClearErrors = () => {
    router.replace('/connexion', undefined, { shallow: true });
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={8} md={6} lg={5} xl={4}>
        {!!error && (
          <ErrorMessage dismissible show onClose={handleClearErrors}>
            Une erreur est survenue lors de la connexion.
            {' '}
            {errorMessages[error] ? errorMessages[error] : 'Si le problème persiste, merci de nous le faire savoir.'}
          </ErrorMessage>
        )}
        <Card>
          <Card.Body>
            <Card.Title className="mb-3 text-center">Connexion à Yoga Sof</Card.Title>
            <Card.Text>Merci d'utiliser l'un des services ci-dessous pour vous inscrire ou vous connecter.</Card.Text>
            {Object.values(providers).map(provider => {
              const isEmail = provider.id === 'email';
              const format = providersData[provider.id];
              const Icon = format.icon;
              return (
                <div key={provider.id} className="mt-2">
                  <FinalForm
                    onSubmit={handleSubmitFor(provider.id)}
                    initialValues={{}}
                    validate={values => joiValidator(values, isEmail ? schemaSignInEmail : schemaSignInExternal)}
                    render={({ handleSubmit }) => (
                      <Form onSubmit={handleSubmit}>
                        {isEmail && (
                          <>
                            <div className="hr-sect my-3">OU</div>
                            <FloatingInputField
                              name="email"
                              label="Adresse e-mail"
                              placeholder="adresse@exemple.com"
                              required
                              fieldProps={{
                                className: 'mb-2',
                                disabled: isLoading,
                              }}
                            />
                          </>
                        )}
                        <Button type="submit" disabled={isLoading} variant={format.variant} size="lg" className="w-100">
                          <Icon className="icon me-2" />
                          {!isEmail ? (
                            <>
                              Se connecter avec
                              {' '}
                              <strong>{provider.name}</strong>
                            </>
                          ) : (
                            <>
                              Recevoir un lien de connexion
                            </>
                          )}
                        </Button>
                      </Form>
                    )}
                  />
                </div>
              );
            })}
            <Card.Text className="mt-3">
              En cas de problème,
              {' '}
              <a href={`mailto:${EMAIL_CONTACT}`}>n'hésitez pas à nous contacter</a>
              .
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
