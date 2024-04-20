import { Community } from "./Community.interface";
import { Question } from "./Question.interface";
import User from "./User.interface"

export interface CreatePoll {
    response: Boolean;
    communityId: Number;
    questionId: Number;
}

export interface Polls {
    response: Boolean;
    communityId: Number;
    questionId: Number;
    User : User;
    Question : Question;
    Community: Community;

}

/**
 * 
 * {
      "id": 1,
      "response": true,
      "createdAt": "2024-03-26T23:48:05.267Z",
      "updatedAt": "2024-03-26T23:48:05.268Z",
      "CommunityId": 1,
      "UserId": 2,
      "QuestionId": 1,
      "User": {
        "id": 2,
        "firstName": "Cristian wilfredo",
        "lastName": "Pacheco",
        "email": "cpacheco@gmail.com",
        "userName": "cpacheco",
        "password": "$2a$10$2XfOUkeDMK83y/cdvrPHf.MTQ16O7dkYilWX6NewK/D882gnqPRqW",
        "active": true,
        "createdAt": "2024-03-26T22:40:28.477Z",
        "updatedAt": "2024-03-26T22:40:28.477Z"
      },
      "Question": {
        "id": 1,
        "description": "Pregunta 1",
        "type": "S",
        "state": true,
        "createdAt": "2024-03-26T22:40:28.477Z",
        "updatedAt": "2024-03-26T22:40:28.477Z"
      },
      "Community": {
        "id": 1,
        "nameC": "La Paz",
        "state": true,
        "createdAt": "2024-03-26T22:40:28.477Z",
        "updatedAt": "2024-03-26T22:40:28.477Z"
      }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */