exports.main = function main(event, context) {
  const token = event.headers.Authorization;
  console.log({ event, token });
  switch (token) {
    case 'allow':
      context.succeed(generatePolicy('user', 'Allow', event.methodArn));
      break;
    case 'deny':
      context.succeed(generatePolicy('user', 'Deny', event.methodArn));
      break;
    case 'unauthorized':
      context.fail('Unauthorized');
      break;
    default:
      context.fail('error!!!!');
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
