<?php

	/**
	 * Saves a response attempt of the user so that other users can assess his/her work
	 * 
	 * @param stdClass $data
	 * 		The data of the newly recorded response media file
	 * @return int
	 * 		The id of the latest inserted response
	 * @throws Exception
	 * 		There was a problem with the database
	 */
	public function saveResponse($data = null){
		
		if(!$data)
			return false;
		
		set_time_limit(0);
		$this->_getResourceDirectories();
		$thumbnail = 'nothumb.png';
		
		try{
			$videoPath = $this->red5Path .'/'. $this->responseFolder .'/'. $data->fileIdentifier . '.flv';
			$mediaData = $this->mediaHelper->retrieveMediaInfo($videoPath);
			$duration = $mediaData->duration;
			if($mediaData->hasVideo){
				$snapshot_output = $this->mediaHelper->takeFolderedRandomSnapshots($videoPath, $this->imagePath, $this->posterPath);
				$thumbnail = 'default.jpg';
			}
		} catch (Exception $e){
			throw new Exception($e->getMessage());
		}
		
		$insert = "INSERT INTO response (fk_user_id, fk_exercise_id, file_identifier, is_private, thumbnail_uri, source, duration, adding_date, rating_amount, character_name, fk_subtitle_id) ";
		$insert = $insert . "VALUES ('%d', '%d', '%s', 1, '%s', '%s', '%s', now(), 0, '%s', %d ) ";
		return $this->conn->_insert($insert, $_SESSION['uid'], $data->exerciseId, $data->fileIdentifier, $thumbnail, $data->source, $duration, $data->characterName, $data->subtitleId );
	}

	
	/**
	 * Makes a response public which means it can be assessed by other users with enough knowledge of the target language
	 * 
	 * @param stdClass $data
	 * 		An object with data about the response
	 * @throws Exception
	 * 		There was a problem with the database
	 */

	public function makePublic($data)
	{
		if(!$data)
			return false;
		
		$result = 0;
		$responseId = $data->id;
		
		$this->conn->_startTransaction();
		
		$sql = "UPDATE response SET is_private = 0 WHERE (id = '%d' ) ";
		$update = $this->conn->_update ( $sql, $responseId );
		if(!$update){
			$this->conn->_failedTransaction();
			throw new Exception("Response publication failed");
		}
			
		//Update the user's credit count
		/*$creditUpdate = $this->_subCreditsForEvalRequest();
		if(!$creditUpdate){
			$this->conn->_failedTransaction();
			throw new Exception("Credit addition failed");
		}
		//Update the credit history
		$creditHistoryInsert = $this->_addEvalRequestToCreditHistory($responseId);
		if(!$creditHistoryInsert){
			$this->conn->_failedTransaction();
			throw new Exception("Credit history update failed");
		}
			
		if($update && $creditUpdate && $creditHistoryInsert){
				$this->conn->_endTransaction();
				$result = $this->_getUserInfo();
		}*/

		if($update){
				$this->conn->_endTransaction();
				$result = $this->_getUserInfo();
		}
			
		return $result;
			
	}

?>