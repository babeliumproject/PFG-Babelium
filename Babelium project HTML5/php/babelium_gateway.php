<?php

/*
$SESSION = new stdClass();
$SESSION->remoteSessId = "qwerty";
$SESSION->uuid = "qwerty";
*/

class babelium_config{
	public $babelium_babeliumWebDomain = 'jlachen';
	public $babelium_babeliumWebPort = '80';
	public $babelium_babeliumApiDomain = 'jlachen/api';
	public $babelium_babeliumApiEndPoint = 'rest.php';
	public $babelium_babeliumApiAccessKey = 'abcde';
	public $babelium_babeliumApiSecretAccessKey = 'fghij';
	public $signature;
}

class Config{
   public $dataroot = '/tmp';
}

class babelium_gateway{
	private $_curlHeaders = array();
	private $_curlHeaderHttpStatusCode;
	private $_curlHeaderHttpStatusMessage;
	private $_curlResponse;
	private $_curlOutput;


/**
	 * Parses the output of cURL. The headers found in this output are stored in the $_curlHeaders class property.
	 * The response object, which should be a JSON object, is stored in the $_curlResponse class property.
	 * @param string $output
	 * 		A string that contains the output of the last cURL execution
	 * @throws moodle_exception
	 * 		The response did not contain the required JSON object
	 */
	private function parseCurlOutput($output){
		$this->_curlResponse = null;
		foreach(preg_split("/(\r?\n)/", $output, 0) as $line){
			if(!empty($line)){
				if(preg_match('/(^{.+)/', $line, $matches)){
					$this->_curlResponse = $matches[1];
				} else {
					$this->_curlHeaders[] = $line;
				}
			}
		}
		$this->parseResponseHeaders();
	}
	
	/**
	 * Searches for a HTTP status code in the response headers. If no headers are returned
	 * or the status code is different to 200 it throws an error
	 * @throws moodle_exception
	 * 		The response had no headers or the status code is not 200
	 */
	private function parseResponseHeaders(){
		$this->_curlHeaderHttpStatusCode = 500;
		$this->_curlHeaderHttpStatusMessage = 'Internal server error';
		if($this->_curlHeaders && is_array($this->_curlHeaders) && count($this->_curlHeaders) > 0){
			foreach($this->_curlHeaders as $h){
				if(preg_match("/^HTTP\/\d.\d (\d+)(.*)/",$h,$matches)){
					$this->_curlHeaderHttpStatusCode = trim($matches[1]);
					$this->_curlHeaderHttpStatusMessage = trim($matches[2]);
					break;
				}
			}
		}
	}
	

	public function serviceCall($protocol,$method,$parameters = null){
		global $CFG; /* , $SESSION;
		if( !isset($SESSION->remoteSessId) && !isset($SESSION->uuid) )
			return false; */
		$commProtocol = 'http://';
		if(isset($protocol) && $protocol != null && $protocol == 'https')
			$commProtocol = 'https://';
		$request = array();
		$request['method'] = $method;
		if($parameters != null && is_array($parameters) && count($parameters) > 0){
			$request['parameters'] = $parameters;
		} /*
		if(isset($SESSION->commToken) && !empty($SESSION->commToken) &&
				$method != "getCommunicationToken")
			$request['header']['token'] = $this->generateToken($method, $SESSION->commToken);
		$request['header']['session'] = $SESSION->remoteSessId;
		$request['header']['uuid'] = $SESSION->uuid;
		*/
		date_default_timezone_set("europe/madrid");
		$request['header']['date'] = "now";
		
		$BCFG = new babelium_config();
		$stringtosign = utf8_encode($request['method']."\n". $request['header']['date']."\n". $BCFG->babelium_babeliumWebDomain);
		$digest = hash_hmac("sha256", $stringtosign, $BCFG->babelium_babeliumApiSecretAccessKey,false);

          /*      error_log("s_long:". strlen ($request['method'] . "\n" . $request['header']['date'] . "\n") . "\n", 3, "/tmp/error.log");        
		error_log("cStringToSign:" . $stringtosign . "\n", 3, "/tmp/error.log");
		error_log("cdigest:" . $digest . "\n", 3, "/tmp/error.log");
		error_log("csecret:" . $BCFG->babelium_babeliumApiSecretAccessKey . "\n", 3, "/tmp/error.log");
*/
		$c_signature = base64_encode($digest);	
		$request['header']['authorization'] = "BMP " . $BCFG->babelium_babeliumApiAccessKey . ":". $c_signature; 
	//	 error_log("header:" . print_r($request['header'],1) . "\n", 3, "/tmp/error.log"); 
		 // echo("header:" . print_r($request['header'],1) . "\n"); 
		$ch = curl_init();

		$request = http_build_query($request,'', '&');

		$web_domain = $BCFG->babelium_babeliumWebDomain;
		$api_domain = $BCFG->babelium_babeliumApiDomain;
		$api_endpoint = $BCFG->babelium_babeliumApiEndPoint;
		$referer = $commProtocol . $api_domain . '/' . $api_endpoint;
		$query_string = $referer . '?' . $method;

		curl_setopt($ch, CURLOPT_URL, $query_string);
		curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Host: ". $web_domain));
		curl_setopt($ch, CURLOPT_COOKIEJAR, $CFG->dataroot."/cookies");
		curl_setopt($ch, CURLOPT_COOKIEFILE, $CFG->dataroot."/cookies");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_HEADER, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_REFERER, $referer);
		$result = curl_exec($ch);
		curl_close($ch);
		//The curl result has both the response body and the response headers
		// we must parse the output before using it
		// print_r($result);
		$this->parseCurlOutput($result);
		print_r($this->_curlResponse);
	 	// $result = json_decode($this->_curlResponse,true);
		// return $result; 
}
}
