cd integrations/ssh/askpass/gtk
make
sudo make install
source integrations/ssh/askpass/selector.sh
ssh-add ~/.ssh/id_ed25519
