<?php
session_start();

require_once dirname(__FILE__) . '/../../services/utils/Config.php';
require_once dirname(__FILE__) . '/../../services/utils/Datasource.php';
require_once dirname(__FILE__) . '/../../services/utils/VideoProcessor.php';
require_once dirname(__FILE__) . '/../../services/utils/EmailAddressValidator.php';
require_once dirname(__FILE__) . '/../../services/utils/Mailer.php';
require_once dirname(__FILE__) . '/../../services/vo/UserVO.php';
require_once dirname(__FILE__) . '/../../services/vo/NewUserVO.php';

/**
 * This is a minimum subset of the services Babelium provides, quickly piled up
 * to test a certain communication configuration for the moodle plugin.
 * We'll be modularizing the final solution but for now please forgive the
 * monolithic architecture.
 */
class PluginSubset{

        //Configuration value object
        private $conf;

        //Database interaction object
        private $db;

        //Multimedia file handling object
        private $mediaHelper;

        public static $userId;

        public function __construct(){
                try{
                        $this->conf = new Config();
                        $this->db = new Datasource($this->conf->host, $this->conf->db_name, $this->conf->db_username, $this->conf->db_password);
                        $this->mediaHelper = new VideoProcessor();
                } catch(Exception $e){
                        throw new Exception($e->getMessage());
                }
        }

        /**
         * SUBTITLE.PHP
         */
        //Not needed, retrieving the subtitle lines does the work processing the output
        public function getExerciseRoles($exerciseId = 0) {
                if(!$exerciseId)
                return false;

                $sql = "SELECT MAX(id) as id,
                               fk_exercise_id as exerciseId,
                               character_name as characterName
                        FROM exercise_role WHERE (fk_exercise_id = %d)
                        GROUP BY exercise_role.character_name ";

                $searchResults = $this->db->_multipleSelect( $sql, $exerciseId );

                return $searchResults;
        }

        public function getSubtitleId($exerciseId=0) {
                if(!$exerciseId)
                        return false;

                $sql = "SELECT SL.id,
                               SL.show_time as showTime,
                               SL.hide_time as hideTime,
                               SL.text,
                               SL.fk_exercise_role_id as exerciseRoleId,
                               ER.character_name as exerciseRoleName,
                               S.id as subtitleId
                        FROM (subtitle_line  AS SL INNER JOIN subtitle AS S ON SL.fk_subtitle_id = S.id)
                        INNER JOIN exercise AS E ON E.id = S.fk_exercise_id
                        RIGHT OUTTER JOIN exercise_role AS ER ON ER.id=SL.fk_exercise_role_id
                        WHERE S.fk_exercise_id = '%d' AND S.id = SL.fk_subtitle_id";
                $searchResults = $this->db->_multipleSelect( $sql, $exerciseId );
                return $searchResults;
        }


        public function getSubtitleLines($subtitle=null) {
                if(!$subtitle)
                        return false;

                $sql = "SELECT SL.id,
                               SL.show_time as showTime,
                               SL.hide_time as hideTime,
                               SL.text,
                               SL.fk_exercise_role_id as exerciseRoleId,
                               ER.character_name as exerciseRoleName,
                               S.id as subtitleId
                        FROM (subtitle_line AS SL INNER JOIN subtitle AS S ON SL.fk_subtitle_id = S.id)
                        INNER JOIN exercise AS E ON E.id = S.fk_exercise_id
                        RIGHT OUTER JOIN exercise_role AS ER ON ER.id=SL.fk_exercise_role_id
                        WHERE ";
                if(!$subtitle->id){
                        $sql .= "S.id = (SELECT MAX(SS.id)
                                         FROM subtitle SS
                                         WHERE SS.fk_exercise_id =%d AND SS.language = '%s') ";
                        $searchResults = $this->db->_multipleSelect ( $sql, $subtitle->exerciseId, $subtitle->language );
                }else{
                        $sql .= "S.id=%d";
                        $searchResults = $this->db->_multipleSelect ( $sql, $subtitle->id );
                }

                $recastedResults = $searchResults; //this is a dummy assignment for cross-compatibility
                return $recastedResults;
        }

        /**
         * EXERCISE.PHP
         */
        public function getRecordableExercises(){
                $where = "";
                $userId = self::$userId;
                if ($userId)
                        //$where = " AND u.ID = ". $userId . " " ;
                        //sprintf() if you're going to use % as a character scape it putting it twice %%, otherwise there'll be problems while parsing your string
                        $where = " AND ( u.id = ". $userId ." OR (e.license like 'cc-%%' )) ";
                else
                        return;

                $sql = "SELECT e.id,
                               e.title,
                               e.description,
                               e.language,
                               e.tags,
                               e.source,
                               e.name,
                               e.thumbnail_uri as thumbnailUri,
                           e.adding_date as addingDate,
                               e.duration,
                               u.username as userName,
                           avg (suggested_level) as avgDifficulty,
                               e.status,
                               e.license,
                               e.reference
                               FROM   exercise e
                                                INNER JOIN user u ON e.fk_user_id= u.id
                                                INNER JOIN subtitle t ON e.id=t.fk_exercise_id
                                    LEFT OUTER JOIN exercise_score s ON e.id=s.fk_exercise_id
                                    LEFT OUTER JOIN exercise_level l ON e.id=l.fk_exercise_id
                         WHERE e.status = 'Available' AND t.complete = 1 ". $where . "
                         GROUP BY e.id
                         ORDER BY e.title ASC, e.language ASC";
                $searchResults = $this->db->_multipleSelect($sql);

                return $searchResults;
        }

        public function getExerciseByName($name = null){
                if(!$name)
                        return;
                $sql = "SELECT e.id,
                               e.title,
                               e.description,
                               e.language,
                               e.tags,
                               e.source,
                               e.name,
                               e.thumbnail_uri as thumbnailUri,
                               e.adding_date as addingDate,
                               e.duration,
                               u.username as userName,
                               avg (suggested_level) as avgDifficulty,
                               e.status,
                               e.license,
                               e.reference
                        FROM  exercise e INNER JOIN user u ON e.fk_user_id= u.id
                        LEFT OUTER JOIN exercise_score s ON e.id=s.fk_exercise_id
                        LEFT OUTER JOIN exercise_level l ON e.id=l.fk_exercise_id
                        WHERE (e.name = '%s' AND e.status='Available')
                        GROUP BY e.id";

                $result = $this->db->_singleSelect($sql,$name);
                return $result;
        }

        public function getExerciseById($id = 0){
                if(!$id)
                        return;

                $sql = "SELECT e.id,
                               e.title,
                               e.description,
                               e.language,
                               e.tags,
                               e.source,
                               e.name,
                               e.thumbnail_uri as thumbnailUri,
                               e.adding_date as addingDate,
                               e.duration,
                               u.username as userName,
                               avg (suggested_level) as avgDifficulty,
                               e.status,
                               e.license,
                               e.reference
                        FROM  exercise e INNER JOIN user u ON e.fk_user_id= u.id
                        LEFT OUTER JOIN exercise_score s ON e.id=s.fk_exercise_id
                        LEFT OUTER JOIN exercise_level l ON e.id=l.fk_exercise_id
                        WHERE (e.id = %d AND e.status='Available')
                        GROUP BY e.id";
                $result = $this->db->_singleSelect($sql,$id);
                //if($result)
                //      $result->avgRating = $this->getExerciseAvgBayesianScore($result->id)->avgRating;

                return $result;
        }

        public function getExerciseLocales($exerciseId=0) {
                if(!$exerciseId)
                        return false;

                $sql = "SELECT DISTINCT language as locale FROM subtitle
                                WHERE fk_exercise_id = %d";

                $results = $this->db->_multipleSelect ( $sql, $exerciseId );

                return $results; // return languages
        }

        /*
        private function getExerciseAvgScore($exerciseId){

                $sql = "SELECT e.id,
                                       avg (suggested_score) as avgRating,
                                       count(suggested_score) as ratingCount
                                        FROM exercise e LEFT OUTER JOIN exercise_score s ON e.id=s.fk_exercise_id
                                        WHERE (e.id = '%d' ) GROUP BY e.id";

                return $this->db->_singleSelect($sql, $exerciseId);
        }

        public function getExerciseAvgBayesianScore($exerciseId = 0){
                if(!$exerciseId)
                return false;


                if(!isset($this->exerciseMinRatingCount)){
                        $sql = "SELECT prefValue FROM preferences WHERE (prefName = 'minVideoRatingCount')";

                        $result = $this->db->_singleSelect($sql);

                        if($result)
                        $this->exerciseMinRatingCount = $result->prefValue;
                        else
                        $this->exerciseMinRatingCount = 0;
                }

                if(!isset($this->exerciseGlobalAvgRating)){
                        $this->exerciseGlobalAvgRating = $this->getExercisesGlobalAvgScore();
                }

                $exerciseRatingData = $this->getExerciseAvgScore($exerciseId);

                $exerciseAvgRating = $exerciseRatingData->avgRating;
                $exerciseRatingCount = $exerciseRatingData->ratingCount;

                if ($exerciseRatingCount == 0) $exerciseRatingCount = 1;

                $exerciseBayesianAvg = ($exerciseAvgRating*($exerciseRatingCount/($exerciseRatingCount + $this->exerciseMinRatingCount))) +
                ($this->exerciseGlobalAvgRating*($this->exerciseMinRatingCount/($exerciseRatingCount + $this->exerciseMinRatingCount)));

                $exerciseRatingData->avgRating = $exerciseBayesianAvg;

                return $exerciseRatingData;

        }

        private function getExercisesGlobalAvgScore(){
                $sql = "SELECT avg(suggested_score) as globalAvgScore FROM exercise_score ";

                return ($result = $this->db->_singleSelect($sql)) ? $result->globalAvgScore : 0;
        }
        */


        /**
         * RESPONSE.PHP
         */
        public function admSaveResponse($data){
                try{
                        $userId = self::$userId;
                        if(!$userId)
                                return;
                        set_time_limit(0);
                        $this->_getResourceDirectories();
                        $thumbnail = 'default.jpg';

                        try{
                                $videoPath = $this->conf->red5Path .'/'. $this->responseFolder .'/'. $data->fileIdentifier . '.flv';
                                $mediaData = $this->mediaHelper->retrieveMediaInfo($videoPath);
                                $duration = $mediaData->duration;

                                if($mediaData->hasVideo){
                                        $snapshot_output = $this->mediaHelper->takeFolderedRandomSnapshots($videoPath, $this->conf->imagePath, $this->conf->posterPath);
                                        //$thumbnail = 'default.jpg';
                                } else {
                                        //Make a folder with the same hash as the audio-only response and link to the parent folder's nothumb.png^M
                                        $thumbPath = $this->conf->imagePath . '/' . $data->fileIdentifier;^M
                                        if(!is_dir($thumbPath)){^M
                                                if(!mkdir($thumbPath))^M
                                                        throw new Exception("You don't have enough permissions to create the thumbail folder: ".$thumbPath."\n");^M
                                                if(!is_writable($thumbPath))^M
                                                        throw new Exception("You don't have enough permissions to write to the thumbnail folder: ".$thumbPath."\n");^M
                                                if( !symlink($this->conf->imagePath.'/nothumb.png', $thumbPath.'/default.jpg')  )^M
                                                        throw new Exception ("Couldn't create link for the thumbnail\n");^M
                                        } else {^M
                                                throw new Exception("A directory with this name already exists: ".$thumbPath."\n");^M
                                        }
                                }
                        } catch (Exception $e){
                                throw new Exception($e->getMessage());
                        }


                        $insert = "INSERT INTO response (fk_user_id, fk_exercise_id, file_identifier, is_private, thumbnail_uri, source, duration, adding_date, rating_amount, character_name, fk_subtitle_id) ";
                        $insert = $insert . "VALUES ('%d', '%d', '%s', 1, '%s', '%s', '%s', now(), 1, '%s', %d ) ";

                        $result = $this->db->_insert($insert, $userId , $data->exerciseId, $data->fileIdentifier, $thumbnail, 'Red5', $duration, $data->characterName, $data->subtitleId );
                        if($result){
                                $r = new stdClass();
                                $r->responseId = $result;
                                if($thumbnail == 'default.jpg')
                                $r->responseThumbnail = 'http://' . $_SERVER['HTTP_HOST'] . '/resources/images/thumbs/' . $data->fileIdentifier . '/default.jpg';
                                else
                                $r->responseThumbnail = 'http://' . $_SERVER['HTTP_HOST'] . '/resources/images/thumbs/nothumb.png';
                                $r->responseFileIdentifier = $data->fileIdentifier;
                                //$this->linkToPlaceholderVideo($r->responseFileIdentifier);
                                return $r;
                        } else {
                                return false;
                        }
                }catch(Exception $e){
                        throw new Exception($e->getMessage());
                }

        }

        private function _getResourceDirectories(){
                $sql = "SELECT prefValue
                        FROM preferences
                        WHERE (prefName='exerciseFolder' OR prefName='responseFolder' OR prefName='evaluationFolder')
                        ORDER BY prefName";
                $result = $this->db->_multipleSelect($sql);
                if($result){
                        $this->evaluationFolder = $result[0] ? $result[0]->prefValue : '';
                        $this->exerciseFolder = $result[1] ? $result[1]->prefValue : '';
                        $this->responseFolder = $result[2] ? $result[2]->prefValue : '';
                }
        }

        /*
        private function linkToPlaceholderVideo($responseIdentifier){
                $this->_getResourceDirectories();
                $linkName = $this->conf->red5Path . '/' . $this->responseFolder . '/' . $responseIdentifier . '_merge.flv';
                $target = $this->conf->red5Path . '/placeholder_merge.flv';

                if(!is_readable($target) || !is_writable($this->conf->red5Path . '/'. $this->responseFolder) )
                throw new Exception("You don't have permissions to read/write in the specified folders");

                if( !symlink($target, $linkName)  )
                throw new Exception ("Couldn't create a link for that target");
        }
        */

        public function admGetResponseById($responseId){
                try{
                        $sql = "SELECT r.file_identifier as responseName,
                                       r.character_name as responseRole,
                                       r.fk_subtitle_id as subtitleId,
                                       r.thumbnail_uri as responseThumbnailUri,
                                       e.id as exerciseId,
                                       e.name as exerciseName,
                                       e.duration,
                                       e.thumbnail_uri as exerciseThumbnailUri,
                                       e.title
                                FROM response r INNER JOIN exercise e ON r.fk_exercise_id = e.id
                                WHERE (e.status='Available' AND r.id = '%d')";
                        //new SessionValidation(true);
                        $result = $this->db->_singleSelect($sql, $responseId);
                        return $result;
                } catch(Exception $e){
                        throw new Exception($e->getMessage());
                }
        }
        
        public function admGetResponseByName($responseName){
                try{
                        $sql = "SELECT r.file_identifier as responseName,
                                       r.character_name as responseRole,
                                       r.fk_subtitle_id as subtitleId,
                                       r.thumbnail_uri as responseThumbnailUri,
                                       e.id as exerciseId,
                                       e.name as exerciseName,
                                       e.duration,
                                       e.thumbnail_uri as exerciseThumbnailUri,
                                       e.title
                                FROM response r INNER JOIN exercise e ON r.fk_exercise_id = e.id
                                WHERE (e.status='Available' AND r.file_identifier = '%s')";
                        //new SessionValidation(true);
                        $result = $this->db->_singleSelect($sql, $responseName);
                        return $result;
                } catch(Exception $e){
                        throw new Exception($e->getMessage());
                }
        }


        public function getResponseVideos(){
        /*        $where = "";
                $userId = self::$userId;
                if ($userId)
                        //$where = " AND u.ID = ". $userId . " " ;
                        //sprintf() if you're going to use % as a character scape it putting it twice %%, otherwise there'll be problems while parsing your string
                        $where = " AND ( u.id = ". $userId ." OR (e.license like 'cc-%%' )) ";
                else
                        return;
        */
                $sql = "SELECT r.id,
                               e.title,
                               e.language,
                               r.source,
                               r.file_identifier as fileIdentifier,
                               r.thumbnail_uri as thumbnailUri,
                               r.adding_date as addingDate,
                               r.duration,
                               r.character_name as characterName,
                               u.username as userName,
                           avg (suggested_level) as avgDifficulty,
                               e.status
                               FROM   response r
                                                INNER JOIN user u ON r.fk_user_id= u.id
                                                INNER JOIN subtitle t ON r.fk_exercise_id=t.fk_exercise_id
                                                INNER JOIN exercise e ON e.id=r.fk_exercise_id
                                    LEFT OUTER JOIN exercise_score s ON r.fk_exercise_id=s.fk_exercise_id
                                    LEFT OUTER JOIN exercise_level l ON r.fk_exercise_id=l.fk_exercise_id
                         WHERE e.status = 'Available' AND t.complete = 1
                         GROUP BY r.id";
                $searchResults = $this->db->_multipleSelect($sql);

                return $searchResults;
        }


        /**
         * Retrieves the languages the user choose to use in Babelium
         * @param int $userId
         *              The user identification number
         * @return array $result
         *              Returns an array of languages or null when nothing found
         */
        private function _getUserLanguages($userId){
                $sql = "SELECT language,
                                           level,
                                           positives_to_next_level as positivesToNextLevel,
                                           purpose
                                FROM user_languages WHERE (fk_user_id='%d')";
                return $this->db->_multipleSelect($sql, $userId);
        }

        /**
         * Retrieves the data for the given user name
         *
         * @param string $username
         * @return mixed $result
         *              Returns an object with the user data or false when no user with that username is found in the database.
         */
        private function getUserInfo($username){
                if (!$username)
                {
                        return false;
                }

                $sql = "SELECT id, username, firstname, lastname, email, creditCount FROM user WHERE (username = '%s') ";

                return $this->db->_singleSelect($sql, $username);
        }

        /**
         * Checks the provided authentication data and logs the user in the system if everything is ok
         *
         * @param stdClass $user
         *              An object with the following properties: (username, password)
         * @return mixed $result
         *              Returns the current user data. Or an error message when wrong login data is provided
         */
        public function processLogin($user = null){
                if($user && is_object($user)){
                        //Check if the given username exists
                        if($this->getUserInfo($user->username)==false){
                                return "wrong_user";
                        } else {
                                //Check whether the user is active or not
                                $sql = "SELECT id FROM user WHERE (username = '%s' AND active = 0)";
                                $result = $this->db->_singleSelect($sql, $user->username);
                                if ( $result )
                                return "inactive_user";
                                //Check if the user provided correct authentication data
                                $sql = "SELECT id, username, firstname, lastname, email, creditCount, joiningDate, isAdmin FROM user WHERE (username='%s' AND password='%s') ";
                                $result = $this->db->_singleSelect($sql, $user->username, $user->password);
                                if($result){
                                        $userLanguages = $this->_getUserLanguages($result->id);
                                        $result->userLanguages = $userLanguages;

                                        $userData = $result;

                                        $this->_startUserSession($userData);

                                        //Don't send back the user's id
                                        $userData->id = null;

                                        return $userData;
                                } else {
                                        return "wrong_password";
                                }
                        }
                }/* else {
                        if( $this->checkSessionLogin() && isset($_SESSION['user-data']) && !empty($_SESSION['user-data']) && is_object($_SESSION['user-data']) ){
                                $loggedUser = $_SESSION['user-data'];
                                $loggedUser->id = 0;
                                return $loggedUser;
                        } else {
                                return "unauthorized";
                        }
                } */
        }


        /**
         * Initializes a session for this user.
         *
         * @param stdClass $userData
         *              An object with the following properties: (id, username, firstname, lastname, email, creditCount, joiningDate, isAdmin, userLanguages[])
         * @return int $result
         *              Returns the last insert id if the session storing went well or false when something went wrong
         */
        private function _startUserSession($userData){
                $this->_setSessionData($userData);

                $sql = "INSERT INTO user_session (fk_user_id, session_id, session_date, duration, keep_alive)
                                VALUES ('%d', '%s', now(), 0, 1)";
                return $this->db->_insert($sql, $_SESSION['uid'], session_id());
        }

        /**
         * Stores current user's data in the session variable
         *
         * @param stdClass $userData
         *              An object with the following properties: (id, name, realName, realSurname, email, creditCount, joiningDate, isAdmin, userLanguages[])
         */
        private function _setSessionData($userData){
                //We are changing the privilege level, so we generate a new session id
                if(!headers_sent())
                        session_regenerate_id();
                $_SESSION['logged'] = true;
                $_SESSION['uid'] = $userData->id;
                $_SESSION['user-agent-hash'] = sha1($_SERVER['HTTP_USER_AGENT']);
                $_SESSION['user-addr'] = $_SERVER['REMOTE_ADDR'];
                $_SESSION['user-data'] = $userData;
                $_SESSION['user-languages'] = $userData->userLanguages;
        }

        public function getSessionData() {
                if($_SESSION['logged'] === true)
                {
                        $userData = $_SESSION['user-data'];
                }
                $userData-> id = null;
                return $userData;
        }
        public function endSession() {
                session_destroy();
        }



        /**
         * Sign-up a new user in the system
         *
         * @param stdClass $user
         *              An object with the new user's data
         * @throws Exception
         *              There was a problem inserting the data on the database or while sending the activation email to the user. Changes are rollbacked.
         */
        public function register($user = null)
        {
                if(!$user)
                        return 'empty_parameter';
                $validator = new EmailAddressValidator();
                if(!$validator->check_email_address($user->email)){
                        return 'invalid_email';
                } else {
                        $initialCredits = $this->_getInitialCreditsQuery();
                        $hash = $this->_createRegistrationHash();

                        try{
                                $this->db->_startTransaction();

                                $insert = "INSERT INTO user (username, password, email, firstname, lastname, creditCount, activation_hash)";
                                $insert .= " VALUES ('%s', '%s', '%s' , '%s', '%s', '%d', '%s' ) ";

                                $realName = $user->firstname ? $user->firstname : "unknown";
                                $realSurname = $user->lastname ? $user->lastname : "unknown";

                                $result = $this->_create ($insert, $user->username, $user->password, $user->email,$realName, $realSurname, $initialCredits, $hash);
                                if ($result)
                                {
                                        //Add the languages selected by the user
                                        $motherTongueLocale = 'en_US';
                                        $languages = $user->languages;
                                        if ($languages && is_array($languages) && count($languages) > 0){
                                                $languageInsertResult = $this->addUserLanguages($languages, $result->id);
                                                //We get the first mother tongue as message locale
                                                $motherTongueLocale = $languages[0]->language;
                                        }
                                        if($result && $languageInsertResult){
                                                $this->db->_endTransaction();
                                        } else {
                                                throw new Exception("Error inserting user or adding user languages");
                                        }

                                        // Submit activation email
                                        $mail = new Mailer($user->username);

                                        $subject = 'Babelium Project: Account Activation';

                                        //$params = new stdClass();
                                        //$params->name = $user->name;
                                        //$params->activationHash = $hash;
                                        $activation_link = htmlspecialchars('http://'.$_SERVER['HTTP_HOST'].'/Main.html#/activation/activate/hash='.$hash.'&user='.$user->username);

                                        $args = array(
                                                'PROJECT_NAME' => 'Babelium Project',
                                                'USERNAME' => $user->username,
                                                'PROJECT_SITE' => 'http://'.$_SERVER['HTTP_HOST'],
                                                'ACTIVATION_LINK' => $activation_link,
                                                'SIGNATURE' => 'The Babelium Project Team');

                                        if ( !$mail->makeTemplate("mail_activation", $args, $motherTongueLocale) )
                                                return "error_sending_email";

                                        $mail = $mail->send($mail->txtContent, $subject, $mail->htmlContent);
                                        if (!$mail) return "error_sending_email";

                                        return $this->db->recast('UserVO',$result);
                                }
                                return "error_user_email_exists";
                        } catch (Exception $e){
                                $this->db->_failedTransaction();
                                // error_log(print_r($e, 1), 3, "/tmp/error.log");
                                return "error_registering_user";
                        }
                }
        }

        /**
         * Adds a set of languages to the user's profile
         *
         * @param array $languages
         *              An array of stdClass with information about each language the user has added to his/her profile
         * @param int $userId
         *              The user id for the provided languages
         *
         * @return int $result
         *              The user language id of the latest added user language. False on error.
         */
        private function addUserLanguages($languages, $userId) {
                // error_log(print_r($languages, 1), 3, "/tmp/error.log");
                $positivesToNextLevel = $this->_getPositivesToNextLevel();

                $params = array();

                $sql = "INSERT INTO user_languages (fk_user_id, language, level, purpose, positives_to_next_level) VALUES ";
                foreach($languages as $language) {
                        $sql .= " ('%d', '%s', '%d', '%s', '%d'),";
                        array_push($params, $userId, $language->language, $language->level, $language->purpose, $positivesToNextLevel);
                }
                unset($language);
                $sql = substr($sql,0,-1);
                // put sql query and all params in one array
                $merge = array_merge((array)$sql, $params);

                $result = $this->db->_insert($merge);
                return $result;

        }

        /**
         * Activates the user profile so that the user is able to use the system
         *
         * @param stdClass $user
         *              An object with user data that allows us to enable it's profile
         *
         * @result mixed
         *              The prefered interface language of the just-activated user. Null on error.
         */
        public function activate($user = null){

                if(!$user)
                        return false;

                $sql = "SELECT language
                                FROM user AS u INNER JOIN user_languages AS ul ON u.id = ul.fk_user_id
                                WHERE (u.username = '%s' AND u.activation_hash = '%s') LIMIT 1";
                $result = $this->db->_singleSelect($sql, $user->username, $user->activationHash);

                if ( $result )
                {
                        $sql = "UPDATE user SET active = 1, activation_hash = ''
                                WHERE (username = '%s' AND activation_hash = '%s')";
                        $update = $this->db->_update($sql, $user->username, $user->activationHash);
                }

                return ($result && $update)? $result->language : NULL ;
        }


        /**
         * Inserts the new user data while checking of the username or email is duplicated
         *
         * @param String $insert
         * @param String $userName
         * @param String $userPass
         * @param String $userEmail
         * @param String $userFirstname
         * @param String $userLastname
         * @param int $userInitialCredits
         * @param String $userHash
         *
         * @return int $result
         *              The latest inserted user id. False on error.
         */
        private function _create($insert, $userName, $userPass, $userEmail, $userFirstname, $userLastname, $userInitialCredits, $userHash) {
                // Check user with same name or same email
                $sql = "SELECT id FROM user WHERE (username='%s' OR email = '%s' ) ";
                $result = $this->db->_singleSelect($sql, $userName, $userEmail);
                if ($result)
                        return false;

                $userId = $this->db->_insert( $insert, $userName, $userPass, $userEmail, $userFirstname, $userLastname, $userInitialCredits, $userHash );
                if($userId){
                        $sql = "SELECT id, username, email, password, creditCount FROM user WHERE (id=%d) ";
                        $result = $this->db->_singleSelect($sql,$userId);
                        return $result;
                } else {
                        return false;
                }
        }

        /**
         * Generates a pseudo-random activation hash for the activation process
         *
         * @return String $hash
         *              The random activation hash
         */
        private function _createRegistrationHash()
        {
                $hash = "";
                $chars = $this->_getHashChars();
                $length = $this->_getHashLength();

                // Generate Hash
                for ( $i = 0; $i < $length; $i++ )
                $hash .= substr($chars, rand(0, strlen($chars)-1), 1);  // java: chars.charAt( random );

                return $hash;
        }

        /**
         * Retrieves the activation hash length from the preferences table of the application
         *
         * @return int $result
         *              Returns the value of the preference table. Returns 20 by default when the query fails
         */
        private function _getHashLength()
        {
                $sql = "SELECT prefValue FROM preferences WHERE ( prefName = 'hashLength' ) ";
                $result = $this->db->_singleSelect($sql);
                return $result ? $result->prefValue : 20;
        }

        /**
         * Retrieves the subset of characters allowed to create the activation hash
         *
         * @return String $result
         *              Returns the value of the preference table. Returns a default set of characters when the query fails.
         */
        private function _getHashChars()
        {
                $sql = "SELECT prefValue FROM preferences WHERE ( prefName = 'hashChars' ) ";
                $result = $this->db->_singleSelect($sql);
                return $result ? $result->prefValue : "abcdefghijklmnopqrstuvwxyz0123456789-_"; // Default: avoiding crashes
        }

        /**
         * Get the initial amount of credits granted to new users
         *
         * @return int
         *              The initial amount of credits granted to the user
         * @throws Exception
         *              There was a problem while querying the database
         */
        private function _getInitialCreditsQuery(){
                $sql = "SELECT prefValue FROM preferences WHERE ( prefName='initialCredits' )";
                $result = $this->db->_singleSelect($sql);
                if($result){
                        return $result->prefValue;
                } else {
                        throw new Exception("An unexpected error occurred while trying to save your registration data.");
                }
        }

        /**
         * Retrieves the amount of positive assessments an user has to receive in order to increase the knowledge level he/she has in a particular language
         *
         * @return int
         *              The amount of positive reviews needed to get to the next level of a language
         * @throws Exception
         *              There was a problem while querying the database
         */
        private function _getPositivesToNextLevel(){
                $sql = "SELECT prefValue FROM preferences WHERE ( prefName='positives_to_next_level' )";
                $result = $this->db->_singleSelect($sql);
                if($result){
                        return $result->prefValue;
                } else {
                        throw new Exception("Unexpected error while trying to retrieve preference data");
                }
        }


}
?>
