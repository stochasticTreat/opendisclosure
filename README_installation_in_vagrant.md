OpenDisclosure backend installation in Vagrant: 6 step procedure! You too can do it at home!
=================

Scripts to build Hack Oregon's back end in a vagrant virtual machine.
This has been tested on a Mac running Yosemite. From what I understand, Virtual box and Vagrant work in Windows as well, and most of the commands are the same, though, I have not tested it in Windows.

To install the backend:

####1) Install Virtual box and Vagrant.

See [https://www.virtualbox.org/](https://www.virtualbox.org/) for virtual box.
	
See [http://www.vagrantup.com/](http://www.vagrantup.com/) for vagrant.
		
-----------------------
###Three important notes on vagrant usage:
	
######a) Never run vagrant commands from your home machine as root :)
  ie, if you mistakenly run anything with the pattern 
	
		host machine prompt> sudo vagrant xxx
		
  you will probably need to read [this](http://stackoverflow.com/questions/25652769/should-vagrant-require-sudo-for-each-command) to make everything   work right again.
	
  Running code as root from inside of the vagrant machine, ( ex: after >vagrant ssh and before ctrl-d ), is fine. 
	
######b) Starting the vagrant virtual machine. 
  To restart vagrant a vagrant box, you must first go to the directory where you first initilized and installed the   vagrant box, then use the 'vagrant up' command. If you type this command:
		
		host machine prompt> vagrant up
		
  in the wrong directory it will cause much confusion and problems. 
	
######c) Re-installing the virtual box
  If you are re-installing the back end and wish to re-install the vagrant instance, you need to first destroy the previously installed vagrant box using these commands, run from the directory where the original vagrant box was installed. 
  
	> vagrant destroy
	
  Then remove the vagrant config file found in the installation directory.
  
	> rm Vagrantfile

-----------------------
####2) Setup the vagrant folder

#####a) Copy this git repository to a folder on your computer.
	
#####b) Navigate to the git repository's folder; this will be used as the Vagrant install folder.
  
####3) Establish the Virtual box and install the server
At a terminal command prompt run these commands:
  
	host machine prompt> vagrant box add ubuntu14 https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-i386-vagrant-disk1.box
	host machine prompt> vagrant init ubuntu14
	host machine prompt> vagrant up
	host machine prompt> vagrant ssh
	#note: the previous command will take you into the vagrant virtual machine and give you a guest machine prompt
	guest machine prompt> cp /vagrant/installBackEnd.sh ~
	guest machine prompt> sudo chmod 755 ~/installBackEnd.sh
	guest machine prompt> ./installBackEnd.sh
	
 	Press 'control + D' to log out of the Vagrant virtual machine; this will give you back the host machine prompt.
 	
 The server should now be installed and the data loaded. All that is left is to make it so the host machine can see the server in the guest machine (by forwarding port 5000), then to start the server.
	
####4) Forward port 5000 from the guest machine to the host machine and start the server
This allows you to see the webpage the back end serves out.

To do this, enter these commands:
 
 	host machine prompt> vagrant reload
	host machine prompt> vagrant ssh
	guest machine prompt> cd opendisclosure/
	guest machine prompt> foreman start
	
	
####5) Check the installation
The server should now be running. To check that everything was successfull open an internet browser window and enter this in the address bar:
  	
  	127.0.0.1:5000
	
The OpenDisclosure site should come up, and should look pretty much just like the current running [OpenDisclosure website](http://www.opendisclosure.io/). 

####6) Shutting everything down. 
It is advised that you do not leave vagrant running when it is not needed as this can occasionally cause conflicts if other vagrant machines are initilized which are located in associated directories or use the same ports. 

   To stop the server, at the command prompt where the command
   
	> foreman start command 
	
  was entered, press 'control + C'. 
  
  To stop vagrant, enter 'control + D' to return to the host machine, then enter this command at the command line:
  
  	host machine prompt> vagrant halt

