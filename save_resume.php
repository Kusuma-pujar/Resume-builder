<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("INSERT INTO resumes (name, email, phone, address, linkedin, github, education, experience, projects, skills, certifications, languages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param(
  "ssssssssssss",
  $data['name'],
  $data['email'],
  $data['phone'],
  $data['address'],
  $data['linkedin'],
  $data['github'],
  $data['education'],
  $data['experience'],
  $data['projects'],
  $data['skills'],
  $data['certifications'],
  $data['languages']
);

if ($stmt->execute()) {
  echo json_encode(["message" => "Resume saved successfully."]);
} else {
  echo json_encode(["message" => "Error saving resume."]);
}

$conn->close();
?>
