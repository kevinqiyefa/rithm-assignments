from app import app
import unittest


class UserTests(unittest.TestCase):
    def test_index(self):
        client = app.test_client()
        response = client.get('/users', content_type='html/text')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<strong>KEVIN</strong>', response.data)

    def test_show(self):
        client = app.test_client()
        response = client.get('/users/1')
        self.assertEqual(response.status_code, 200)

    def test_create(self):
        client = app.test_client()
        url = 'https://www.50-best.com/images/cute_animal_pictures/pdog_with_glasses.jpg'
        response = client.post(
            '/users',
            data=dict(
                firstname="NEWNAME", lastname="NEWNAME", profileLink=url),
            follow_redirects=True)
        self.assertIn(b'&#39;NEWNAME&#39;', response.data)

    def test_edit(self):
        client = app.test_client()
        response = client.get('/users/10/edit')
        self.assertIn(b'NEWNAME', response.data)

    def test_update(self):
        client = app.test_client()
        url = 'https://www.50-best.com/images/cute_animal_pictures/pdog_with_glasses.jpg'
        response = client.patch(
            '/users/10',
            data=dict(firstname="Elie", lastname="Schoppik", profileLink=url),
            follow_redirects=True)
        self.assertIn(b'Elie', response.data)
        self.assertNotIn(b'NEWNAME', response.data)

    def test_delete(self):
        client = app.test_client()
        response = client.delete('/users/10', follow_redirects=True)
        self.assertNotIn(b'Elie', response.data)


class MessageTests(unittest.TestCase):
    def test_index(self):
        client = app.test_client()
        response = client.get('/users/1/message')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'hello', response.data)

    def test_show(self):
        client = app.test_client()
        response = client.get('/message/2')
        self.assertEqual(response.status_code, 200)

    def test_create(self):
        client = app.test_client()
        response = client.post(
            '/users/1/message',
            data=dict(content="mmmmmmessageeee", id=1),
            follow_redirects=True)
        self.assertIn(b'mmmmmmessageeee', response.data)

    def test_edit(self):
        client = app.test_client()
        response = client.get('/message/2/edit')
        self.assertIn(b'edited_message', response.data)

    def test_update(self):
        client = app.test_client()

        response = client.patch(
            '/message/2',
            data=dict(content="edited message", id=1),
            follow_redirects=True)
        self.assertIn(b'edited message', response.data)
        self.assertNotIn(b'edited_message', response.data)

    def test_delete(self):
        client = app.test_client()
        response = client.delete('/message/5', follow_redirects=True)
        self.assertNotIn(b'mmmmmmessageeee', response.data)


if __name__ == '__main__':
    unittest.main()
    # All tests have to start with the word tests!
