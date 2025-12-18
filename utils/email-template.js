export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Subscription Reminder</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
  <p>Hi ${userName},</p>

  <p>
    This is a friendly reminder that your
    <strong>${subscriptionName}</strong> subscription
    will renew in <strong>${renewalDate} </strong>.
  </p>

  <p>
    <strong>Renewal Date:</strong> ${renewalDate}<br/>
    <strong>Plan:</strong> ${planName}<br/>
    <strong>Price:</strong> $${price}<br/>
    <strong>Payment Method:</strong> ${paymentMethod}
  </p>

  <p>
    You can manage your subscription or update your payment details anytime:
  </p>

  <p>
    Thanks for being with us,<br/>
    <strong>The Team</strong>
  </p>
</body>
</html>
`;

export const emailTemplates = [
  {
    label: "7 days before reminder",
    generateSubject: (data) =>
      `Reminder: Your ${data.subscriptionName} renews in 7 days`,
    generateBody: (data) => generateEmailTemplate(data),
  },
  {
    label: "3 days before reminder",
    generateSubject: (data) =>
      `3 days left — ${data.subscriptionName} renewal`,
    generateBody: (data) => generateEmailTemplate(data),
  },
  {
    label: "1 days before reminder",
    generateSubject: (data) =>
      `Final reminder: ${data.subscriptionName} renews tomorrow`,
    generateBody: (data) => generateEmailTemplate(data),
  },
];
