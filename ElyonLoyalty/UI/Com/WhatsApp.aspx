﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WhatsApp.aspx.cs" Inherits="ElyonUI.UI.Com.WhatsApp" %>

<!DOCTYPE html>

<html lang="en">

<head>
    <title>LEGRA Chat</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="../../assets/Wapp/WhatsAppStyle.css" rel="stylesheet" />
    <link rel="shortcut icon" type="image/icon" href="/img/favicon.png" />
</head>

<body>

    <div class="container app">
        <div class="row app-one">
            <div class="col-sm-4 side">
                <div class="side-one">
                    <!-- Heading -->
                    <div class="row heading">
                        <div class="col-sm-3 col-xs-3 heading-avatar">
                            <div class="heading-avatar-icon">
                                <img src="/img/favicon.png">
                            </div>
                        </div>
                        <div class="col-sm-1 col-xs-1  heading-dot  pull-right">
                            <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                        </div>
                        <div class="col-sm-2 col-xs-2 heading-compose  pull-right">
                            <i class="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
                        </div>
                    </div>
                    <!-- Heading End -->

                    <!-- SearchBox -->
                    <div class="row searchBox">
                        <div class="col-sm-12 searchBox-inner">
                            <div class="form-group has-feedback">
                                <input id="searchText" type="text" class="form-control" name="searchText" placeholder="Search">
                                <span class="glyphicon glyphicon-search form-control-feedback"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Search Box End -->
                    <!-- sideBar -->
                    <div class="row sideBar">
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Sidebar End -->
                </div>
                <div class="side-two">

                    <!-- Heading -->
                    <div class="row newMessage-heading">
                        <div class="row newMessage-main">
                            <div class="col-sm-2 col-xs-2 newMessage-back">
                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            </div>
                            <div class="col-sm-10 col-xs-10 newMessage-title">
                                New Chat
                            </div>
                        </div>
                    </div>
                    <!-- Heading End -->

                    <!-- ComposeBox -->
                    <div class="row composeBox">
                        <div class="col-sm-12 composeBox-inner">
                            <div class="form-group has-feedback">
                                <input id="composeText" type="text" class="form-control" name="searchText" placeholder="Search People">
                                <span class="glyphicon glyphicon-search form-control-feedback"></span>
                            </div>
                        </div>
                    </div>
                    <!-- ComposeBox End -->

                    <!-- sideBar -->
                    <div class="row compose-sideBar">
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="/img/favicon.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta">Ankit Jain
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
            <div class="col-sm-8 conversation">
                 
                <div class="row heading">
                    <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                        <div class="heading-avatar-icon">
                            <img src="/img/favicon.png">
                        </div>
                    </div>
                    <div class="col-sm-8 col-xs-7 heading-name">
                        <a class="heading-name-meta">Ankit Jain
                        </a>
                        <span class="heading-online">Online</span>
                    </div>
                    <div class="col-sm-1 col-xs-1  heading-dot pull-right">
                        <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                    </div>
                </div>
                
                <div class="row message" id="converacion">
                    <div class="row message-previous">
                        <div class="col-sm-12 previous">
                            <a onclick="previous(this)" id="ankitjain28" name="20">Show Previous Message!
                            </a>
                        </div>
                    </div>                  
                </div>
                <div class="row reply">
                    <div class="col-sm-1 col-xs-1 reply-emojis">
                        <i class="fa fa-smile-o fa-2x"></i>
                    </div>
                    <div class="col-sm-9 col-xs-9 reply-main">
                        <textarea class="form-control" rows="1" id="message" placeholder="Escribe un mensaje aquí"></textarea>
                    </div>
                    <div class="col-sm-1 col-xs-1 reply-recording" hidden="hidden">
                        <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
                    </div>
                    <div class="col-sm-1 col-xs-1 reply-send" id="send">
                        <i class="fa fa-send fa-2x" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="../../assets/local/LegraSocket.js"></script>
<script src="../../assets/Wapp/WhatsApp.js?v=1"></script>
<script>
    jQuery(document).ready(function () {
        iniSocket.init();
    });

</script>
</html>