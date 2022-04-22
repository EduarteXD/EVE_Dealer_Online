import base64

client_id = input()
app_secret = input()

user_pass = "{}:{}".format(client_id, app_secret)

basic_auth = base64.urlsafe_b64encode(user_pass.encode('utf-8')).decode()
auth_header = "Basic {}".format(basic_auth)

print(auth_header)
