const key = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

exports.main = function main(event, context) {
  const token = event.headers.Authorization;
  console.log({ event, token });
  if (token === key) {
    context.succeed(generatePolicy('user', 'Allow', event.methodArn));
  } else {
    context.fail('Unauthorized');
  }
};

function generatePolicy(principalId, effect, resource) {
  console.log({ principalId, effect, resource });
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
}
